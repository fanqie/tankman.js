const lodash = require("lodash")
const Facades = require("../../facades/Facades")
const mineTypes = require("mime-types");
const fs = require("fs");

/**
 * @abstract
 */
class HttpResponseWrite {
    _response
    _config = {
        json: {
            template: {
                err_no: '#err_no',
                data: '#data',
                err_msg: '#err_msg',
                time: '#time',
            },
            defaultErrNo: {
                success: 200,
                error: 503,
            },
        },

    }

    constructor() {
        if (new.target === HttpResponseWrite) {
            throw new Error('HttpResponseWrite class Instantiation is not allowed');
        }
        this._config.json.template = Facades.Config.Get("response")?.json?.template || this._config.json.template
    }

    RenderTemplate(path, data) {
    }

    JsonFree(json) {
        this.SetResponseType('application/json; charset=utf-8')
        this.WriteText(JSON.stringify(json))
    }

    Json(data, errMsg, errNo) {


        const tpl = lodash.cloneDeep(this._config.json.template);
        for (const filed in tpl) {
            // err_no: '#err_no',
            //     data: '#data',
            //     err_msg: '#err_msg',
            //     time: '#time',
            switch (tpl[filed]) {
                case "#err_no":
                    tpl[filed] = errNo;
                    break;
                case "#data":
                    tpl[filed] = data;
                    break;
                case "#err_msg":
                    tpl[filed] = errMsg;
                    break;
                case "#time":
                    tpl[filed] = new Date().getTime();
                    break;
            }
        }
        this.JsonFree(tpl)
    }

    JsonSuccess(data, errMsg = "success") {
        this.Json(data, errMsg, this._config.json.defaultErrNo.success)
    }

    JsonError(data, errMsg, errNo = this._config.json.defaultErrNo.error) {
        this.Json(data, errMsg, errNo)
    }

    Download(filePath, fileName, headers) {
        this.DownloadIo(filePath, fileName, headers)
    }

    WriteStatic(filePath) {
        const fileType = mineTypes.lookup(filePath)
        const fileBuffer = fs.createReadStream(filePath)
        this.SetResponseType(`${fileType}; charset=utf-8`)
        this.WriteStream(fileBuffer)
    }

    DownloadIo(bytes, fileName, headers = {}, type = 'application/octet-stream; charset=utf-8') {
        this.SetResponseType(type)
        this.WriteBytes(bytes)
    }

    Text(string, type = 'text/plain; charset=utf-8') {
        this.SetResponseType(type)
        this.WriteText(string)
    }

    Html(string, type = 'text/html;charset=utf-8') {
        this.SetResponseType(type)
        this.WriteText(string)
    }

    Xml(string, type = 'text/xml;charset=utf-8') {
        this.SetResponseType(type)
        this.WriteText(string)
    }

    /**
     *
     * @param bytes
     * @abstract
     */
    WriteBytes(bytes) {
    }

    /**
     *
     * @param string
     * @abstract
     */
    WriteText(string) {
    }

    /**
     *
     * @param buffers
     * @abstract
     */
    WriteBuffer(buffers) {
    }

    /**
     *
     * @param stream
     * @abstract
     */
    WriteStream(stream) {
    }

    SetResponseType(type) {
        this._response.type = type;
    }
}

module.exports = HttpResponseWrite

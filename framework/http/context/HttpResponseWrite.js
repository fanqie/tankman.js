const lodash = require('lodash');
const facades = require('../../facades/Facades');
const SingletonFactory = require('../../factor/SingletonFactory');
const mineTypes = require('mime-types');
const fs = require('fs');
const path = require('path');
const HttpContext = require('./HttpContext');
const PugTemplate = SingletonFactory.make(path.resolve(__dirname, "../../template/PugTemplate.js"))
const ArtTemplate = SingletonFactory.make(path.resolve(__dirname, "../../template/ArtTemplate.js"))

/**
 * @abstract
 */
class HttpResponseWrite {

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

    };
    _response;

    /**
     * @type HttpContext
     * @private
     */
    _httpCtx

    constructor(httpCtx) {
        this.httpCtx = httpCtx
        if (new.target === HttpResponseWrite) {
            throw new Error('HttpResponseWrite class Instantiation is not allowed');
        }
        this._config.json.template = facades.config.get('response')?.json?.template || this._config.json.template;
    }


    jsonFree(json) {
        this.setResponseType('application/json; charset=utf-8');
        this.writeText(JSON.stringify(json));
    }

    json(data, errMsg, errNo) {
        const tpl = lodash.cloneDeep(this._config.json.template);
        for (const filed in tpl) {
            if (tpl.hasOwnProperty(filed)) {
                switch (tpl[filed]) {
                    case '#err_no':
                        tpl[filed] = errNo;
                        break;
                    case '#data':
                        tpl[filed] = data;
                        break;
                    case '#err_msg':
                        tpl[filed] = errMsg;
                        break;
                    case '#time':
                        tpl[filed] = new Date().getTime();
                        break;
                }
            }
        }
        this.jsonFree(tpl);
    }

    jsonSuccess(data, errMsg = 'success') {
        this.json(data, errMsg, this._config.json.defaultErrNo.success);
    }

    jsonError(data, errMsg, errNo = this._config.json.defaultErrNo.error) {
        this.json(data, errMsg, errNo);
    }

    download(filePath, fileName, headers) {
        this.downloadIo(filePath, fileName, headers);
    }

    fs(filePath) {
        const fileType = mineTypes.lookup(filePath);
        const fileBuffer = fs.createReadStream(filePath);
        this.setResponseType(`${fileType}; charset=utf-8`);
        this.writeStream(fileBuffer);
    }

    downloadIo(bytes, fileName, headers = {}, type = 'application/octet-stream; charset=utf-8') {
        this.setResponseType(type);
        this.writeBytes(bytes);
    }

    text(string, type = 'text/plain; charset=utf-8') {
        this.setResponseType(type);
        this.writeText(string);
    }


    view(filename, data = {}) {
        const html = facades.view.renderFile(filename, {
            ...facades.view.getShare(),
            ...data, ctx: {
                request: this.httpCtx.request,
                response: this.httpCtx.response,
                session: this.httpCtx.session,
                route: facades.route
            }
        })
        this.html(html)
    }

    pugView(filename, data = {}) {
        const html = PugTemplate.renderFile(filename, {
            ...facades.view.getShare(),
            ...data, ctx: {
                request: this.httpCtx.request,
                response: this.httpCtx.response,
                session: this.httpCtx.session,
                route: facades.route
            }
        })
        this.html(html)
    }

    artView(filename, data = {}) {
        const html = ArtTemplate.renderFile(filename, {
            ...facades.view.getShare(),
            ...data, ctx: {
                request: this.httpCtx.request,
                response: this.httpCtx.response,
                session: this.httpCtx.session,
                route: facades.route
            }
        })
        this.html(html)
    }

    html(string, type = 'text/html;charset=utf-8') {
        this.setResponseType(type);
        this.writeText(string);
    }

    xml(string, type = 'text/xml;charset=utf-8') {
        this.setResponseType(type);
        this.writeText(string);
    }

    /**
     *
     * @param {any} bytes
     * @abstract
     */
    writeBytes(bytes) {
        throw new Error('Abstract method has no implementation');
    }

    /**
     *
     * @param {string} string
     * @abstract
     */
    writeText(string) {
        throw new Error('Abstract method has no implementation');
    }

    /**
     *
     * @param {any} buffers
     * @abstract
     */
    writeBuffer(buffers) {
        throw new Error('Abstract method has no implementation');
    }

    /**
     *
     * @param {any} stream
     * @abstract
     */
    writeStream(stream) {
        throw new Error('Abstract method has no implementation');
    }

    setResponseType(type) {
        this._response.type = type;
    }
}

module.exports = HttpResponseWrite;

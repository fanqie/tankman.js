module.exports = class HttpResponseWrite {
    _response
    _httpResponse

    constructor(ctx, httpResponse) {
        this._response = ctx.response
    }

    Render(path, data) {
    }

    Json(json) {
        this.SetResponseType('application/json; charset=utf-8')
        this._httpResponse.WriteText(JSON.stringify(json))
    }

    JsonSuccess(data) {
        this.SetResponseType('application/json; charset=utf-8')
        const json = {}
        this.Json(json)
    }

    Download(filePath, fileName, headers) {
        this.DownloadIo(filePath, fileName, headers)
    }

    DownloadIo(bytes, fileName, headers) {
        this.SetResponseType('application/octet-stream; charset=utf-8')
        this._httpResponse.WriteBytes(bytes)
    }

    Text(string) {
        this.SetResponseType('text/plain; charset=utf-8')
        this._httpResponse.WriteText(string)
    }

    Html(string) {
        this.SetResponseType('text/html;charset=utf-8')
        this._httpResponse.WriteText(string)
    }

    Xml(string) {
        this.SetResponseType('text/xml;charset=utf-8')
        this._httpResponse.WriteText(string)
    }

    SetResponseType(type) {
        this._response.type = type;
    }
}

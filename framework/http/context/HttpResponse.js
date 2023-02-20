/** @typedef {typeof import('./HttpResponseWrite')} HttpResponseWrite */
/** @typedef {typeof import('koa/lib/response')} KoaResponse */
/** @typedef {typeof import('koa/lib/context')} KoaContext */
const ResponseWrite = require("./HttpResponseWrite");
module.exports = class HttpResponse {
    /**
     *
     * @type {HttpResponseWrite}
     */
    output
    /**
     * @type KoaResponse
     * @private
     */
    _response

    constructor(ctx) {
        this.output = new ResponseWrite(ctx)
    }

    WriteBytes(bytes) {
        this._response.body = bytes
    }

    WriteText(text) {
        this._response.body = text
    }

    SetResponseType(type) {
        this._response.type = type;
    }

    /**
     * Perform a 302 redirect to url.
     * The string “back” is special-cased to provide Referrer support, when Referrer is not present alt or “/” is used.
     * Examples:
     * this.redirect('back'); this.redirect('back', '/index.html'); this.redirect('/login'); this.redirect('http://google.com');
     * @param url
     * @param alt
     * @constructor
     */
    Redirect(url, alt) {
        this._response.redirect(url, alt)
    }
}

const HttpContext = require('./HttpContext');

class HttpCookie {
    _ctx
    /**
     * @type HttpContext
     * @private
     */
    httpCtx


    /**
     *
     * @param httpCtx {HttpContext}
     */
    constructor(httpCtx) {
        this.httpCtx = httpCtx;
        this._ctx = httpCtx._ctx;
    }

    /**
     *
     * @param name {string}
     * @param opts {{signed:Boolean}|undefined}
     * @return  string | null
     * @function
     */
    Get(name, opts = undefined) {
        return this._ctx.cookies.get(name, opts || {}) || null;
    }

    /**
     * set cookie
     * @param name {string}
     * @param value {string}
     * @param opts {{domain?:String,signed?:Boolean,maxAge?: Number, path?:String, httpOnly?: Boolean,secure?:Boolean,overwrite?:Boolean,sameSite?: 'strict'|'lax'|'none'}|undefined}
     * @function
     */
    Set(name, value, opts = undefined) {
        this._ctx.cookies.set(name, value, Object.assign(opts || {}))
    }
}

module.exports = HttpCookie

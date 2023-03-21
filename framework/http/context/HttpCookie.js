const HttpContext = require('./HttpContext');

class HttpCookie {
    _ctx;
    /**
     * @type HttpContext
     * @private
     */
    httpCtx;


    /**
     *
     * @param {HttpContext} httpCtx
     */
    constructor(httpCtx) {
        this.httpCtx = httpCtx;
        this._ctx = httpCtx._ctx;
    }

    /**
     *
     * @param  {string} name
     * @param {{signed:Boolean}|undefined} opts
     * @return  {string | null}
     * @function
     */
    get(name, opts = undefined) {
        return this._ctx.cookies.get(name, opts || {}) || null;
    }

    /**
     * set cookie
     * @param {string} name
     * @param {string} value
     * @param {{domain?:String,signed?:Boolean,maxAge?: Number, path?:String, httpOnly?: Boolean,secure?:Boolean,overwrite?:Boolean,sameSite?: 'strict'|'lax'|'none'}|undefined} opts
     * @function
     */
    set(name, value, opts = undefined) {
        this._ctx.cookies.set(name, value, Object.assign(opts || {}));
    }
}

module.exports = HttpCookie;

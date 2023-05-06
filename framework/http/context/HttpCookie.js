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
     * @param {any} opts
     * @return  {string | null}
     * @function
     */
    get(name, opts = undefined) {
        return this._ctx.cookies.get(name, {...opts, signed: true} || {signed: true}) || null;
    }

    // eslint-disable-next-line valid-jsdoc
    /**
     * set cookie
     * @param {string} name
     * @param {string} value
     * @param {{domain?:String,signed?:Boolean,maxAge?: Number, path?:String, httpOnly?: Boolean,secure?:Boolean,overwrite?:Boolean,sameSite?: 'strict'|'lax'|'none'}|undefined} opts
     * @returns {void}
     * @function
     */
    set(name, value, opts = undefined) {
        this._ctx.cookies.set(name, value, Object.assign({...opts, signed: true} || {signed: true}));
    }


    renewLife(name, millisecond = 15 * 60 * 1000) {
        const values = this.get(name);
        if (values && values.indexOf("#") > 1) {
            const varArray = values?.split("#")
            const exp = Number(varArray[1] || 0);
            const now = Date.now();
            if (exp > now && exp < (now + millisecond * 2)) {
                const value = this._ctx.cookies.get(name);
                const newExp=exp + millisecond
                this.set(name, [value,newExp].join("#"), {maxAge: newExp - now});
                return newExp;
            }
        }
        return 0;
    }
}

module.exports = HttpCookie;

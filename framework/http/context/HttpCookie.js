const HttpContext = require('./HttpContext');
const facades = require('../../facades/Facades');
const crypto = require('crypto');


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
        const value = this._ctx.cookies.get(name, {...opts, signed: true} || {signed: true}) || null;
        return value ? this.decrypt(value) : value;
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
        this._ctx.cookies.set(name, this.encrypt(value), Object.assign({...opts, signed: true} || {signed: true}));
    }

    getExpireTime(name) {
        const values = this.get(name);
        if (values && values.indexOf("#") > 1) {
            const varArray = values?.split("#")
            const expireTime = Number(varArray[1] || -1);
            return expireTime;
        }
        return -1;
    }

    renewLife(name, millisecond = 15 * 60 * 1000) {
        const expireTime = this.getExpireTime(name);
        const now = Date.now();
        if (expireTime > now && expireTime < (now + millisecond * 2)) {
            const value = this.get(name)?.split("#")[0];
            const newExp = expireTime + millisecond
            this.set(name, [value, newExp].join("#"), {maxAge: newExp - now});
            return newExp;
        }
        return expireTime;
    }


    encrypt(data) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', facades.env.get("APP_KEY"), iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const ivLength = iv.length;
        return ivLength.toString(16).padStart(2, '0') + iv.toString('hex') + encrypted;
    }

    decrypt(data) {
        const ivLength = parseInt(data.slice(0, 2), 16);
        const iv = Buffer.from(data.slice(2, 2 + 2 * ivLength), 'hex');
        const encrypted = data.slice(2 + 2 * ivLength);
        const decipher = crypto.createDecipheriv('aes-256-cbc', facades.env.get("APP_KEY"), iv);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }


}

module.exports = HttpCookie;

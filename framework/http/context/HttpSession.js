const HttpContext = require('./HttpContext');
const {randomUUID} = require("crypto");
const sessionId = "TANK_MAN_JS_SESSION_ID"
const Facades = require("../../facades/Facades")
const Cache = require("../../cache/Cache")

class HttpSession {

    _ctx
    /**
     * @type HttpContext
     * @private
     */
    httpCtx
    /**
     * @type Cache
     * @private
     */
    _driver
    _defaultTtl = 60

    /**
     *
     * @param httpCtx {HttpContext}
     */
    constructor(httpCtx) {

        this.httpCtx = httpCtx;
        this._ctx = httpCtx._ctx;
        if (!this.httpCtx.cookie.Get(sessionId, {signed: true})) {
            this.httpCtx.cookie.Set(sessionId, randomUUID(), {signed: true,sameSite:"lax",secure:true})
        }
        this._driver = Facades.Cache
    }

    /**
     * get httpSession
     * @param name {string}
     * @param defaultValue {*}
     * @return  string | null
     * @function
     */
    Get(name, defaultValue = "") {
        return this._driver.Get(this._prefixName(name), defaultValue) || defaultValue
    }

    /**
     * set httpSession
     * @param key
     * @param value
     * @return {*}
     * @function
     */
    Set(key, value = null) {
        this._driver.Set(this._prefixName(name), value, 0)
    }

    /**
     * Forget or remove httpSession
     * @param name
     * @function
     */
    Remove(name) {
        this._driver.Forget(this._prefixName(name))
    }

    /**
     * @param name
     * @return {string}
     * @private
     */
    _prefixName(name) {
        return [sessionId, name].join("_")
    }
}

module.exports = HttpSession

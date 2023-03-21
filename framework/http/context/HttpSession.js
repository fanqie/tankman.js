const HttpContext = require('./HttpContext');
const {randomUUID} = require('crypto');
const sessionId = 'TANK_MAN_JS_SESSION_ID';
const Facades = require('../../facades/Facades');
const Cache = require('../../cache/Cache');

class HttpSession {
    _ctx;
    /**
     * @type HttpContext
     * @private
     */
    httpCtx;
    /**
     * @type Cache
     * @private
     */
    _driver;
    _defaultTtl = 60;

    /**
     *
     * @param {HttpContext} httpCtx
     */
    constructor(httpCtx) {
        this.httpCtx = httpCtx;
        this._ctx = httpCtx._ctx;
        if (!this.httpCtx.cookie.get(sessionId, {signed: true})) {
            this.httpCtx.cookie.set(sessionId, randomUUID(), {signed: true, sameSite: 'lax'});
        }
        this._driver = Facades.cache;
    }

    /**
     * get httpSession
     * @param {string} name
     * @param {*} defaultValue
     * @return  {string | null}
     * @function
     */
    get(name, defaultValue = '') {
        return this._driver.get(this._prefixName(name), defaultValue) || defaultValue;
    }

    /**
     * set httpSession
     * @param {string} name
     * @param {string|number|null} value
     * @function
     */
    set(name, value = null) {
        this._driver.set(this._prefixName(name), value, 0);
    }

    /**
     * forget or remove httpSession
     * @param {string} name
     * @function
     */
    remove(name) {
        this._driver.forget(this._prefixName(name));
    }

    /**
     * @param {string} name
     * @return {string}
     * @private
     */
    _prefixName(name) {
        return [sessionId, name].join('_');
    }
}

module.exports = HttpSession;

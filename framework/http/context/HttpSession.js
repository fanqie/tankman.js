const HttpContext = require('./HttpContext');
const {randomUUID} = require('crypto');
const sessionKey = 'NODEJS_SESSION_ID';
const facades = require('../../facades/Facades');
const Cache = require('../../cache/Cache');
const ms = require("ms");

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
    /**
     *
     * @type {number|string}
     * @private
     */
    _defaultTtl = "1m";
    _renewSubTtl = "15m";
    _sessionKey = [facades.env.get("APP_NAME", "DC"), sessionKey].join("@");

    /**
     *
     * @param {HttpContext} httpCtx
     */
    constructor(httpCtx) {
        this.httpCtx = httpCtx;
        this._ctx = httpCtx._ctx;
        if (!this.httpCtx.cookie.get(this._sessionKey, {signed: true})) {

            this.httpCtx.cookie.set(this._sessionKey, [randomUUID(), Date.now() + ms(this._defaultTtl)].join("#"), {
                signed: true,
                sameSite: 'lax',
                maxAge: ms(this._defaultTtl)
            });
        } else {
            this.renewLifeLife()
        }
        this._driver = facades.cache;
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

    renewLifeLife() {
        this.httpCtx.cookie.renewLife(this._sessionKey, ms(this._renewSubTtl))
    }

    /**
     * set httpSession
     * @param {string} name
     * @param {string|number|null} value
     * @function
     */
    set(name, value = null) {
        this._driver.set(this._prefixName(name), value, ms("1d"));
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
        return [sessionKey, name].join('_');
    }
}

module.exports = HttpSession;

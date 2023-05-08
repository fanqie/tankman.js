const HttpContext = require('./HttpContext');
const {randomUUID} = require('crypto');
const sessionKey = 'NODEJS_SESSION_ID';
const facades = require('../../facades/Facades');
const Cache = require('../../cache/Cache');
const ms = require("ms");
const FileSessionAdapter = require("../httpSessionAdapater/FileSessionAdapter");

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
    _cookieKey = [facades.env.get("APP_NAME", "DC"), sessionKey].join("@");

    config = {
        /**
         * No matter which one you choose, the default driver will be used directly,
         * so it is not recommended to choose the file type when the type is cache,
         * If you choose a file type, it will default to creating a session file, which is not suitable for distributed systems
         */
        handler: new FileSessionAdapter(),//file,cache,database default path is: path.join(process.cwd(),"storage", ".temp", "session")
        life: {
            maxAge: '30m',
            autoRenew: true,//default：true
            renewTime: '15m',
        },
        cookieIdPrefix: "",
        gcIntervalTime: '1s'//The interval between expired session recycling
    }

    /**
     *
     * @param {HttpContext} httpCtx
     */
    constructor(httpCtx) {
        this.httpCtx = httpCtx;
        this._ctx = httpCtx._ctx;
        if (!this.httpCtx.cookie.get(this._cookieKey)) {
            this._setSessionKey()
        } else {
            this.renewTime()
        }
        this.loadConfig()
    }

    _getSessionKey() {
        return this.httpCtx.cookie.get(this._cookieKey)?.split("#")[0]||null;
    }

    _setSessionKey() {
        this.httpCtx.cookie.set(this._cookieKey, [randomUUID(), Date.now() + ms(this._defaultTtl)].join("#"), {
            sameSite: 'lax',
            maxAge: ms(this._defaultTtl)
        });
    }

    loadConfig() {
        this.config = facades.config?.httpSession ? {...facades.config?.httpSession, ...this.config} : this.config
    }

    _handler() {
        return this.config.handler;
    }

    /**
     * get httpSession
     * @param {string} name
     * @param {*} defaultValue
     * @return  {string | null}
     * @function
     */
    get(name, defaultValue = '') {
        const expireTime = this.httpCtx.cookie.getExpireTime(this._cookieKey);
        if (expireTime < Date.now()) {
            return null;
        }
        return this._deWarp(this._handler().get(this._getSessionKey(),name) || defaultValue, name);
    }

    renewTime() {
        this._handler().renewTimeBySessionId(this._getSessionKey(), this.httpCtx.cookie.renewLife(this._cookieKey, ms(this._renewSubTtl)))
    }

    /**
     * set httpSession
     * @param {string} name
     * @param {string|number|null} value
     * @function
     */
    set(name, value = null) {
        const expireTime = this.httpCtx.cookie.getExpireTime(this._cookieKey);
        if (expireTime < Date.now()) {
            return;
        }
        this._handler().set(this._getSessionKey(), name, this._warp(value), expireTime);
    }

    flash(name, value = null) {
        const expireTime = this.httpCtx.cookie.getExpireTime(this._cookieKey);
        if (expireTime < Date.now()) {
            return;
        }
        this._handler().set(this._getSessionKey(), name, this._flashWarp(value), expireTime);
    }

    _warp(value) {
        return {v: value, c: 0}
    }

    _flashWarp(value) {
        return {v: value, c: 1}
    }

    _deWarp(sessionData, name) {
        if (sessionData && sessionData.c === 1) {
            this._handler().remove(this._getSessionKey(), name)
        }
        return sessionData?.v || null;
    }

    /**
     * forget or remove httpSession
     * @param {string} name
     * @function
     */
    remove(name) {
        this._handler().remove(this._getSessionKey(), name);
    }

}

module.exports = HttpSession;

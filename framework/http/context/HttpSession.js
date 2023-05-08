const HttpContext = require('./HttpContext');
const {randomUUID} = require('crypto');
const sessionKey = 'NODEJS_SESSION_ID';
const facades = require('../../facades/Facades');
const ms = require("ms");
const FileSessionAdapter = require("../httpSessionAdapater/FileSessionAdapter");
const {value} = require("lodash/seq");
let gcTime = Date.now()

class HttpSession {
    _ctx;
    /**
     * @type HttpContext
     * @private
     */
    httpCtx;
    _cookieKey = [facades.env.get("APP_NAME", "DC"), sessionKey].join("@");
    _sessionKey = "";
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
        gcIntervalTime: '10s'//The interval between expired session recycling
    }

    /**
     *
     * @param {HttpContext} httpCtx
     */
    constructor(httpCtx) {
        this.httpCtx = httpCtx;
        this._ctx = httpCtx._ctx;

        this._loadConfig()
        this._gc();

        if (!this.httpCtx.cookie.get(this._cookieKey)) {
            this._setSessionKey()
        } else {
            if (this.config.life.autoRenew) {
                this.renewTime()
            }
        }
        this._sessionKey = this._sessionKey || this.httpCtx.cookie.get(this._cookieKey)?.split("#")[0];

    }

    /**
     * @private
     */
    _gc() {
        if (Date.now() - gcTime > ms(this.config.gcIntervalTime)) {
            this.execGc()
            gcTime = Date.now()
        }
    }

    execGc() {
        this._handler().gc();
    }

    /**
     * @private
     */
    _setSessionKey() {
        this._sessionKey = randomUUID();
        this.httpCtx.cookie.set(this._cookieKey, [this._sessionKey, Date.now() + ms(this.config.life.maxAge)].join("#"), {
            sameSite: 'lax',
            maxAge: ms(this.config.life.maxAge)
        });
    }

    /**
     * @private
     */
    _loadConfig() {
        this.config = {...this.config, ...facades.config?.get("httpSession", {})};
    }

    /**
     * @return {FileSessionAdapter}
     * @private
     */
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
            this._gc();
            return null;
        }
        return this._deWarp(this._handler().get(this._sessionKey, name) || defaultValue, name);
    }

    all() {
        const expireTime = this.httpCtx.cookie.getExpireTime(this._cookieKey);
        if (expireTime < Date.now()) {
            this._gc();
            return null;
        }
        const values = this._handler().getBySessionId(this._sessionKey)
        if (!values) {
            return {};
        }
        const result = {}
        Object.keys(values).forEach(key => {
            result[key] = this._deWarp(values[key], key)
        })
        return result;
    }

    renewTime() {
        this._handler().renewTimeBySessionId(this._sessionKey, this.httpCtx.cookie.renewLife(this._cookieKey, ms(this.config.life.renewTime)))
    }

    /**
     * set httpSession
     * @param {string} name
     * @param {string|number|null} value
     * @function
     */
    set(name, value = null) {
        const expireTime = this.httpCtx.cookie.getExpireTime(this._cookieKey);

        this._handler().set(this._sessionKey, name, this._warp(value), expireTime === -1 ? Date.now() + ms(this.config.life.maxAge) : expireTime);
    }

    /**
     * @param name
     * @param value
     */
    flash(name, value = null) {
        const expireTime = this.httpCtx.cookie.getExpireTime(this._cookieKey);
        if (expireTime < Date.now()) {
            return;
        }
        this._handler().set(this._sessionKey, name, this._flashWarp(value), expireTime);
    }

    /**
     * @param value
     * @return {{c: number, v}}
     * @private
     */
    _warp(value) {
        return {v: value, c: 0}
    }

    /**
     * @param value
     * @return {{c: number, v}}
     * @private
     */
    _flashWarp(value) {
        return {v: value, c: 1}
    }

    /***
     * @param sessionData
     * @param name
     * @return {number|*|null}
     * @private
     */
    _deWarp(sessionData, name) {
        if (sessionData && sessionData.c === 1) {
            this._handler().remove(this._sessionKey, name)
        }
        return sessionData?.v || null;
    }

    /**
     * forget or remove httpSession
     * @param {string} name
     * @function
     */
    remove(name) {
        this._handler().remove(this._sessionKey, name);
    }

}

module.exports = HttpSession;

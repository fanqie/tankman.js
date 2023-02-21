/** @typedef {typeof import('log4js')} Log4jS */
const log4js = require("log4js");
const { Facades } = require("../Index");
class Log {
    constructor(config) {
        this.log4js = log4js;
    }
    /**
     *
     * @param options {Object}
     * @public
     */
    SetConfig(options) {
        this.log4js.configure(Object.assign(Object.assign({}, Facades.Config.Get("log")), options));
    }
    /**
     *
     * @param category? { string}
     * @return {import('log4js').Logger}
     * @public
     */
    GetLogger(category) {
        try {
            return this.log4js.getLogger(category || "default");
        }
        catch (e) {
            console.log(e);
            return this.log4js.getLogger("default");
        }
    }
    /**
     *
     * @param callback
     * @constructor
     */
    Shudown(callback) {
        return this.log4js.shutdown(callback);
    }
    /**
     *
     * @param type
     * @param fn
     * @constructor
     */
    AddLayout(type, fn) {
        return this.log4js.addLayout(type, fn);
    }
    /**
     *
     * @param message {any}
     * @param category {string}
     * @public
     */
    Trace(message, category) {
        this.GetLogger(category).trace(message || "");
    }
    /**
     *
     * @param message {any}
     * @param category? {string}
     * @public
     */
    Debug(message, category) {
        this.GetLogger(category).debug(message || "");
    }
    /**
     *
     * @param message {string}
     * @param category {string?}
     * @public
     */
    Info(message, category = "") {
        this.GetLogger(category).info(message || "");
    }
    /**
     *
     * @param message {any}
     * @param category {string?}
     * @public
     */
    Warn(message, category) {
        this.GetLogger(category).warn(message || "");
    }
    /**
     *
     * @param message {any}
     * @param category {string?}
     * @public
     */
    Error(message, category) {
        this.GetLogger(category || "").error(message || "");
    }
    /**
     *
     * @param message {any}
     * @param category {string?}
     * @public
     */
    Fatal(message, category) {
        this.GetLogger(category || "").fatal(message || "");
    }
    /**
     *
     * @param message {any}
     * @public
     */
    TraceHttp(message) {
        this.GetLogger("http").trace(message || "");
    }
    /**
     *
     * @param message {any}
     * @public
     */
    DebugHttp(message) {
        this.GetLogger("http").debug(message || "");
    }
    /**
     *
     * @param message {string}
     * @public
     */
    InfoHttp(message = "") {
        this.GetLogger("http").info(message || "");
    }
    /**
     *
     * @param message {any}
     * @public
     */
    WarnHttp(message) {
        this.GetLogger("http").warn(message || "");
    }
    /**
     *
     * @param message {any}
     * @public
     */
    ErrorHttp(message) {
        this.GetLogger("http").error(message || "");
    }
    /**
     *
     * @param message {any}
     * @public
     */
    FatalHttp(message) {
        this.GetLogger("http").fatal(message || "");
    }
}
module.exports = Log;

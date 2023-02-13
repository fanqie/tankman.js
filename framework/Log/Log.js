/** @typedef {typeof import('log4js')} Log4jS */
const log4js = require("log4js");
const {FC} = require("../Index");

class Log {

    /**
     *
     * @type {Log4jS}
     */
    log4js = null

    constructor(config) {
        this.log4js = log4js
        this.log4js.level = "debug";
    }

    /**
     *
     * @param options {Object}
     * @constructor
     */
    SetConfig(options) {
        this.log4js.configure({...FC.Config.Get("log"), ...options});
    }

    /**
     *
     * @param category {category?: string}
     * @return {Logger}
     * @constructor
     */
    GetLogger(category) {
        return this.log4js.getLogger(category)
    }

    /**
     *
     * @param callback {cb?: (error?: Error) => void}
     * @constructor
     */
    Shudown(callback) {
        return this.log4js.shutdown(callback)
    }

    /**
     *
     * @param type {string}
     * @param fn {(a: any) => (logEvent: LoggingEvent) => any): void;}
     */
    addLayout(type, fn) {
        return this.log4js.addLayout(type, fn)
    }

    /**
     *
     * @param message {any}
     * @param category {string}
     * @constructor
     */
    Trace(message, category) {
        this.log4js.getLogger(category || "").trace(message || "");
    }

    /**
     *
     * @param message {any}
     * @param category {category?:string}
     * @constructor
     */
    Debug(message, category) {
        this.log4js.getLogger(category || "").debug(message || "");
    }

    /**
     *
     * @param message {any}
     * @param category {category?:string}
     * @constructor
     */
    Info(message, category) {
        this.log4js.getLogger(category || "").info(message || "");
    }

    /**
     *
     * @param message {any}
     * @param category {category?:string}
     * @constructor
     */
    Warn(message, category) {
        this.log4js.getLogger(category || "").warn(message || "");
    }

    /**
     *
     * @param message {any}
     * @param category {category?:string}
     * @constructor
     */
    Error(message, category) {
        this.log4js.getLogger(category || "").error(message || "");
    }

    /**
     *
     * @param message {any}
     * @param category {category?:string}
     * @constructor
     */
    Fatal(message, category) {
        this.log4js.getLogger(category || "").fatal(message || "");
    }
}

module.exports = Log

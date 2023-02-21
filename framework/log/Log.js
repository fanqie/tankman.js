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
     * @public
     */
    SetConfig(options) {
         this.log4js.configure({...FC.Config.Get("log"), ...options});
    }

    /**
     *
     * @param category {category?: string}
     * @return {Logger}
     * @public
     */
    GetLogger(category) {
        return this.log4js.getLogger(category||"default")
    }

    /**
     *
     * @param callback {cb?: (error?: Error) => void}
     * @public
     */
    Shudown(callback) {
        return this.log4js.shutdown(callback)
    }

    /**
     *
     * @param type {string}
     * @param fn {(a: any) => (logEvent: LoggingEvent) => any): void;}
     */
    AddLayout(type, fn) {
        return this.log4js.addLayout(type, fn)
    }

    /**
     *
     * @param message {any}
     * @param category {string}
     * @public
     */
    Trace(message, category) {
        this.GetLogger(category ).trace(message || "");
    }

    /**
     *
     * @param message {any}
     * @param category {category?:string}
     * @public
     */
    Debug(message, category) {
        this.GetLogger(category).debug(message || "");
    }

    /**
     *
     * @param message {string}
     * @param category {category?:string}
     * @public
     */
    Info(message, category) {
        this.GetLogger(category).info(message || "");
    }

    /**
     *
     * @param message {any}
     * @param category {category?:string}
     * @public
     */
    Warn(message, category) {
        this.GetLogger(category ).warn(message || "");
    }

    /**
     *
     * @param message {any}
     * @param category {category?:string}
     * @public
     */
    Error(message, category) {
        console.log(":::",message)
        this.GetLogger(category || "").error(message || "");
    }

    /**
     *
     * @param message {any}
     * @param category {category?:string}
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
        this.GetLogger("http" ).trace(message || "");
    }

    /**
     *
     * @param message {any}
     * @param category {category?:string}
     * @public
     */
    DebugHttp(message) {
        this.GetLogger("http").debug(message || "");
    }

    /**
     *
     * @param message {any}
     * @param category {category?:string}
     * @public
     */
    InfoHttp(message, category) {
        this.GetLogger("http").info(message || "");
    }

    /**
     *
     * @param message {any}
     * @public
     */
    WarnHttp(message) {
        this.GetLogger( "http" ).warn(message || "");
    }

    /**
     *
     * @param message {any}
     * @public
     */
    ErrorHttp(message) {
        this.GetLogger( "http").error(message || "");
    }

    /**
     *
     * @param message {any}
     * @public
     */
    FatalHttp(message) {
        this.GetLogger( "http").fatal(message || "");
    }
}

module.exports = Log

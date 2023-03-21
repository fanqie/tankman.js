export = Log;
declare class Log {
    constructor(config: any);
    /**
     *
     * @type  {Log4jS}
     */
    log4js: Log4jS;
    /**
     *
     * @param {Object} options
     * @public
     */
    public setConfig(options: any): void;
    /**
     * @param {String} [category=""]
     * @return {import('log4js').Logger}
     * @public
     */
    public getLogger(category?: string): import('log4js').Logger;
    /**
     * @param {any} callback
     * @constructor
     */
    shudown(callback: any): void;
    /**
     *
     * @param {string} type
     * @param {any} fn
     * @constructor
     */
    addLayout(type: string, fn: any): void;
    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    public trace(message: any, category?: string): void;
    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    public debug(message: any, category?: string): void;
    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    public info(message: any, category?: string): void;
    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    public warn(message: any, category?: string): void;
    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    public error(message: any, category?: string): void;
    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    public fatal(message: any, category?: string): void;
    /**
     *
     * @param {*} message
     * @public
     */
    public traceHttp(message: any): void;
    /**
     *
     * @param {*} message
     * @public
     */
    public debugHttp(message: any): void;
    /**
     *
     * @param {*} message
     * @public
     */
    public infoHttp(message?: any): void;
    /**
     *
     * @param {*} message
     * @public
     */
    public warnHttp(message: any): void;
    /**
     *
     * @param {*} message
     * @public
     */
    public errorHttp(message: any): void;
    /**
     *
     * @param {*} message
     * @public
     */
    public fatalHttp(message: any): void;
}
declare namespace Log {
    export { Log4jS };
}
type Log4jS = typeof import('log4js');

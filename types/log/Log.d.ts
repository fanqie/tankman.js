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
     * @param options {Object}
     * @public
     */
    public SetConfig(options: any): void;
    /**
     *
     * @param category? { string}
     * @return {import('log4js').Logger}
     * @public
     */
    public GetLogger(category: any): import('log4js').Logger;
    /**
     *
     * @param callback
     * @constructor
     */
    Shudown(callback: any): void;
    /**
     *
     * @param type
     * @param fn
     * @constructor
     */
    AddLayout(type: any, fn: any): void;
    /**
     *
     * @param message {any}
     * @param category {string}
     * @public
     */
    public Trace(message: any, category: string): void;
    /**
     *
     * @param message {any}
     * @param category? {string}
     * @public
     */
    public Debug(message: any, category: any): void;
    /**
     *
     * @param message {string}
     * @param category {string?}
     * @public
     */
    public Info(message: string, category?: string | null): void;
    /**
     *
     * @param message {any}
     * @param category {string?}
     * @public
     */
    public Warn(message: any, category: string | null): void;
    /**
     *
     * @param message {any}
     * @param category {string?}
     * @public
     */
    public Error(message: any, category: string | null): void;
    /**
     *
     * @param message {any}
     * @param category {string?}
     * @public
     */
    public Fatal(message: any, category: string | null): void;
    /**
     *
     * @param message {any}
     * @public
     */
    public TraceHttp(message: any): void;
    /**
     *
     * @param message {any}
     * @public
     */
    public DebugHttp(message: any): void;
    /**
     *
     * @param message {string}
     * @public
     */
    public InfoHttp(message?: string): void;
    /**
     *
     * @param message {any}
     * @public
     */
    public WarnHttp(message: any): void;
    /**
     *
     * @param message {any}
     * @public
     */
    public ErrorHttp(message: any): void;
    /**
     *
     * @param message {any}
     * @public
     */
    public FatalHttp(message: any): void;
}
declare namespace Log {
    export { Log4jS };
}
type Log4jS = typeof import('log4js');

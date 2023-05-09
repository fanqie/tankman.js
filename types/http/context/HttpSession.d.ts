export = HttpSession;
declare class HttpSession {
    /**
     *
     * @param {HttpContext} httpCtx
     */
    constructor(httpCtx: HttpContext);
    _ctx: KoaContext;
    /**
     * @type HttpContext
     * @private
     */
    private httpCtx;
    _cookieKey: string;
    _sessionKey: string;
    config: {
        /**
         * No matter which one you choose, the default driver will be used directly,
         * so it is not recommended to choose the file type when the type is cache,
         * If you choose a file type, it will default to creating a session file, which is not suitable for distributed systems
         */
        handler: FileSessionAdapter;
        life: {
            maxAge: string;
            autoRenew: boolean;
            renewTime: string;
        };
        cookieIdPrefix: string;
        gcIntervalTime: string;
    };
    execGc(): void;
    /**
     * get httpSession
     * @param {string} name
     * @param {*} defaultValue
     * @return  {string | null}
     * @function
     */
    get(name: string, defaultValue?: any): string | null;
    all(): {};
    renewTime(): void;
    /**
     * set httpSession key:value
     * @param {string} name
     * @param {string|number|null} value
     * @function
     */
    set(name: string, value?: string | number | null): void;
    /**
     * set httpSession key:value
     * @param {string} name
     * @param {string|number|null} value
     */
    store(name: string, value?: string | number | null): void;
    /**
     * @param name
     * @param {string|number|null} value
     */
    flash(name: any, value?: string | number | null): void;
    /**
     * forget or remove httpSession
     * @param {string} name
     * @function
     */
    remove(name: string): void;
    /**
     * forget or remove httpSession
     * @param {string} name
     */
    forget(name: string): void;
    /**
     * @param value
     * @return {{c: number, v}}
     * @private
     */
    private _warp;
    /**
     * @param value
     * @return {{c: number, v}}
     * @private
     */
    private _flashWarp;
    /***
     * @param sessionData
     * @param name
     * @return {number|*|null}
     * @private
     */
    private _deWarp;
    /**
     * @private
     */
    private _setSessionKey;
    /**
     * @private
     */
    private _loadConfig;
    /**
     * @return {SessionHandlerAbstract}
     * @private
     */
    private _handler;
    /**
     * @private
     */
    private _gc;
}
import FileSessionAdapter = require("../httpSessionAdapater/FileSessionAdapter");
import HttpContext = require("./HttpContext");

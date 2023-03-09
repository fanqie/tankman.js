export = HttpSession;
declare class HttpSession {
    /**
     *
     * @param httpCtx {HttpContext}
     */
    constructor(httpCtx: HttpContext);
    _ctx: KoaContext;
    /**
     * @type HttpContext
     * @private
     */
    private httpCtx;
    /**
     * @type Cache
     * @private
     */
    private _driver;
    _defaultTtl: number;
    /**
     * get httpSession
     * @param name {string}
     * @param defaultValue {*}
     * @return  string | null
     * @function
     */
    Get(name: string, defaultValue?: any): any;
    /**
     * set httpSession
     * @param key
     * @param value
     * @return {*}
     * @function
     */
    Set(key: any, value?: any): any;
    /**
     * Forget or remove httpSession
     * @param name
     * @function
     */
    Remove(name: any): void;
    /**
     * @param name
     * @return {string}
     * @private
     */
    private _prefixName;
}
import HttpContext = require("./HttpContext");

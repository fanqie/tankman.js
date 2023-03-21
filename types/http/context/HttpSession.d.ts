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
    /**
     * @type Cache
     * @private
     */
    private _driver;
    _defaultTtl: number;
    /**
     * get httpSession
     * @param {string} name
     * @param {*} defaultValue
     * @return  {string | null}
     * @function
     */
    get(name: string, defaultValue?: any): string | null;
    /**
     * set httpSession
     * @param {string} name
     * @param {string|number|null} value
     * @function
     */
    set(name: string, value?: string | number | null): void;
    /**
     * forget or remove httpSession
     * @param {string} name
     * @function
     */
    remove(name: string): void;
    /**
     * @param {string} name
     * @return {string}
     * @private
     */
    private _prefixName;
}
import HttpContext = require("./HttpContext");

export = HttpCookie;
declare class HttpCookie {
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
     *
     * @param  {string} name
     * @param {any} opts
     * @return  {string | null}
     * @function
     */
    get(name: string, opts?: any): string | null;
    /**
     * set cookie
     * @param {string} name
     * @param {string} value
     * @param {{domain?:String,signed?:Boolean,maxAge?: Number, path?:String, httpOnly?: Boolean,secure?:Boolean,overwrite?:Boolean,sameSite?: 'strict'|'lax'|'none'}|undefined} opts
     * @returns {void}
     * @function
     */
    set(name: string, value: string, opts?: {
        domain?: string;
        signed?: boolean;
        maxAge?: number;
        path?: string;
        httpOnly?: boolean;
        secure?: boolean;
        overwrite?: boolean;
        sameSite?: 'strict' | 'lax' | 'none';
    } | undefined): void;
    getExpireTime(name: any): number;
    renewLife(name: any, millisecond?: number): number;
    encrypt(data: any): string;
    decrypt(data: any): string;
}
import HttpContext = require("./HttpContext");

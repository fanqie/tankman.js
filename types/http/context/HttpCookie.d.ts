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
     * @param {{signed:Boolean}|undefined} opts
     * @return  {string | null}
     * @function
     */
    get(name: string, opts?: {
        signed: boolean;
    } | undefined): string | null;
    /**
     * set cookie
     * @param {string} name
     * @param {string} value
     * @param {{domain?:String,signed?:Boolean,maxAge?: Number, path?:String, httpOnly?: Boolean,secure?:Boolean,overwrite?:Boolean,sameSite?: 'strict'|'lax'|'none'}|undefined} opts
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
}
import HttpContext = require("./HttpContext");

export = HttpCookie;
declare class HttpCookie {
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
     *
     * @param name {string}
     * @param opts {{signed:Boolean}|undefined}
     * @return  string | null
     * @function
     */
    Get(name: string, opts?: {
        signed: boolean;
    } | undefined): any;
    /**
     * set cookie
     * @param name {string}
     * @param value {string}
     * @param opts {{domain?:String,signed?:Boolean,maxAge?: Number, path?:String, httpOnly?: Boolean,secure?:Boolean,overwrite?:Boolean,sameSite?: 'strict'|'lax'|'none'}|undefined}
     * @function
     */
    Set(name: string, value: string, opts?: {
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

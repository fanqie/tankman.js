export = Middleware;
/**
 * @abstract
 */
declare class Middleware {
    /**
     *
     * @param httpCtx {HttpContext}
     * @param next
     * @returns {Promise<void>}
     * @public
     * @abstract
     */
    public Handle(httpCtx: HttpContext, next: any): Promise<void>;
}
import HttpContext = require("../context/HttpContext");

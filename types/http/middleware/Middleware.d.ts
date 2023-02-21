export = Middleware;
declare class Middleware {
    /**
     *
     * @param httpCtx {HttpContext}
     * @param next
     * @returns {Promise<void>}
     * @public
     */
    public Handle(httpCtx: HttpContext, next: any): Promise<void>;
}
import HttpContext = require("../context/HttpContext");

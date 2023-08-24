export = Middleware;
/**
 * @abstract
 */
declare class Middleware {
    /**
     *
     * @param {HttpContext} httpCtx
     * @param {function} next
     * @return {Promise<void>}
     * @public
     * @abstract
     */
    public handle(httpCtx: HttpContext, next: Function): Promise<void>;
}
import HttpContext = require("../context/HttpContext");

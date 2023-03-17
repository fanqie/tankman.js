export = Controller;
declare class Controller {
    /**
     *
     * @param httpCtx {HttpContext}
     * @param params
     * @constructor
     */
    Index(httpCtx: HttpContext, ...params: any[]): void;
}
import HttpContext = require("../context/HttpContext");

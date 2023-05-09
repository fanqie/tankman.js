export = Controller;
declare class Controller {
    /**
     *
     * @param {HttpContext} httpCtx
     * @param {Object} params
     * @constructor
     */
    index(httpCtx: HttpContext, ...params: any): void;
}
import HttpContext = require("../context/HttpContext");

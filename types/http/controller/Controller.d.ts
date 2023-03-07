export = Controller;
declare class Controller {
    /**
     * @param httpCtx {HttpContext}
     * @constructor
     */
    Index(httpCtx: HttpContext): void;
}
import HttpContext = require("../context/HttpContext");

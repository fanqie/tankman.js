export = HttpContext;
declare class HttpContext {
    /**
     * @param ctx
     */
    constructor(ctx: any);
    /**
     *
     * @type {HttpRequest}
     */
    request: HttpRequest;
    /**
     *
     * @type {HttpResponse}
     */
    response: HttpResponse;
}
import HttpRequest = require("./HttpRequest");
import HttpResponse = require("./HttpResponse");

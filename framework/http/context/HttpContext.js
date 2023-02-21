const HttpRequest = require("./HttpRequest");
const Request = require("./HttpRequest");
const HttpResponse = require("./HttpResponse");
const Response = require("./HttpResponse");
module.exports = class HttpContext {
    /**
     *
     * @type {HttpRequest}
     */
    request = null
    /**
     *
     * @type {HttpResponse}
     */
    response = null

    /**
     * @param ctx
     */
    constructor(ctx) {
        this.request = new Request(ctx)
        this.response = new Response(ctx)
    }
}

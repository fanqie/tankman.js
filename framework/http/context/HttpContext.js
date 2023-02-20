/** @typedef {typeof import('./HttpRequest')} HttpRequest */
/** @typedef {typeof import('./HttpResponse')} HttpResponse */

const Request = require("./HttpRequest");
const Response = require("./HttpResponse");
/**
 *
 * @type {HttpContext}
 */
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

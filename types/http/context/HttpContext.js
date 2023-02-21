const HttpRequest = require("./HttpRequest");
const Request = require("./HttpRequest");
const HttpResponse = require("./HttpResponse");
const Response = require("./HttpResponse");
module.exports = class HttpContext {
    /**
     * @param ctx
     */
    constructor(ctx) {
        /**
         *
         * @type {HttpRequest}
         */
        this.request = null;
        /**
         *
         * @type {HttpResponse}
         */
        this.response = null;
        this.request = new Request(ctx);
        this.response = new Response(ctx);
    }
};

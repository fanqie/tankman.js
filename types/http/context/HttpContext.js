// @ts-nocheck
const KoaContext = require("koa/lib/context");
const HttpRequest = require("./HttpRequest");
const HttpResponse = require("./HttpResponse");
module.exports = class HttpContext {
    /**
     * @param ctx
     */
    constructor(app, ctx) {
        this._ctx = ctx;
        this._app = app;
        this.request = new HttpRequest(ctx);
        this.response = new HttpResponse(ctx);
    }
    App() {
        return this._app;
    }
    /**
     * set cookies
     *  httpContext.SetCookies('userInfo', 'tankMan', {
     *      maxAge:60*1000*60
     *    });
     * @param name {string}
     * @param value
     * @param options
     * @description
     * This sets the given cookie in the response and returns the current context to allow chaining.
     * If the value is omitted, an outbound header with an expired date is used to delete the cookie.
     * If the options object is provided, it will be used to generate the outbound cookie header as follows:
     * maxAge: a number representing the milliseconds from Date.now() for expiry
     * expires: a Date object indicating the cookie's expiration date (expires at the end of session by default).
     * path: a string indicating the path of the cookie (/ by default).
     * domain: a string indicating the domain of the cookie (no default).
     * secure: a boolean indicating whether the cookie is only to be sent over HTTPS (false by default for HTTP, true by default for HTTPS). Read more about this option below.
     * httpOnly: a boolean indicating whether the cookie is only to be sent over HTTP(S), and not made available to client JavaScript (true by default).
     * priority: a string indicating the cookie priority. This can be set to 'low', 'medium', or 'high'.
     * sameSite: a boolean or string indicating whether the cookie is a "same site" cookie (false by default). This can be set to 'strict', 'lax', 'none', or true (which maps to 'strict').
     * signed: a boolean indicating whether the cookie is to be signed (false by default). If this is true, another cookie of the same name with the .sig suffix appended will also be sent, with a 27-byte url-safe base64 SHA1 value representing the hash of cookie-name=cookie-value against the first Keygrip key. This signature key is used to detect tampering the next time a cookie is received.
     * overwrite: a boolean indicating whether to overwrite previously set cookies of the same name (false by default). If this is true, all cookies set during the same request with the same name (regardless of path or domain) are filtered out of the Set-Cookie header when setting this cookie.
     * @public
     */
    SetCookies(name, value, options) {
        this._ctx.cookies.set(name, value, options);
    }
    /**
     * get cookies
     *  httpContext.SetCookies('userInfo', 'tankMan', {
     *      maxAge:60*1000*60
     *    });
     * @param name {string}
     * @param options?
     * @constructor
     */
    GetCookies(name, options) {
        this._ctx.cookies.get(name, options);
    }
    /**
     * get origin node request object
     * @returns {Http2ServerRequest | Request}
     * @public
     */
    GetNodeRequest() {
        return this._ctx.req;
    }
    /**
     *  get origin node response object
     * @returns {Http2ServerRequest | Request}
     * @public
     */
    GetNodeResponse() {
        return this._ctx.req;
    }
    /**
     * throw http error
     * @param status
     * @param msg?
     * @param properties?
     * @constructor
     */
    ThrowHttpError(status = 503, msg = 'server error', properties) {
        this._ctx.throw(status, msg, properties);
    }
    /**
     *
     * @param url
     * @param alt?
     * @public
     */
    Redirect(url, alt = "") {
        this.response.Redirect(url, alt);
    }
};

export = HttpContext;
declare class HttpContext {
    /**
     *
     * @param  {Application}  app
     * @param {KoaContext} ctx
     * @constructor
     */
    constructor(app: Application, ctx: KoaContext);
    /**
     * @type  KoaContext()
     */
    _ctx: KoaContext;
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
    /**
     *
     * @type {HttpSession}
     */
    session: HttpSession;
    /**
     * @type {Application}
     */
    _app: Application;
    /**
     * @type {Router|RouterHandle|redirect}
     */
    _router: Router | RouterHandle | redirect;
    /**
     * @type {HttpCookie}
     */
    cookie: HttpCookie;
    params: {};
    /**
     *
     * @return {Router|RouterHandle|redirect}
     * @function
     */
    getRouter(): Router | RouterHandle | redirect;
    /**
     *
     * @param  {Router|RouterHandle|redirect} router
     * @function
     */
    setRouter(router: Router | RouterHandle | redirect): void;
    app(): Application;
    /**
     * set cookies
     *  httpContext.setCookies('userInfo', 'tankMan', {
     *      maxAge:60*1000*60
     *    });
     * @param {string} name
     * @param {string} value
     * @param {Object} options
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
     * overwrite: a boolean indicating whether to overwrite previously set cookies of the same name (false by default). If this is true, all cookies set during the same request with the same name (regardless of path or domain) are filtered out of the set-Cookie header when setting this cookie.
     * @public
     */
    public setCookies(name: string, value: string, options: any): void;
    /**
     * get cookies
     *  httpContext.setCookies('userInfo', 'tankMan', {
     *      maxAge:60*1000*60
     *    });
     * @param  {string} name
     * @param  {any} [options={}]
     * @function
     */
    getCookies(name: string, options?: any): void;
    /**
     * get origin node request object
     * @return {Http2ServerRequest | Request}
     * @public
     */
    public getNodeRequest(): Http2ServerRequest | Request;
    /**
     *  get origin node response object
     * @return {Http2ServerRequest | Request}
     * @public
     */
    public getNodeResponse(): Http2ServerRequest | Request;
    /**
     * throw http error
     * @param {number} status
     * @param {string} [msg='']
     * @param {any} [properties=null]
     * @function
     */
    throwHttpError(status?: number, msg?: string, properties?: any): void;
    /**
     *
     * @param {string} url
     * @param {string} [alt='']
     * @public
     */
    public redirect(url: string, alt?: string): void;
}
import HttpRequest = require("./HttpRequest");
import HttpSession = require("./HttpSession");
import HttpCookie = require("./HttpCookie");

export = HttpRequest;
declare class HttpRequest {
    /**
     * @param  {HttpContext} httpCtx
     */
    constructor(httpCtx: HttpContext);
    /**
     * @type KoaRequest()
     * @private
     */
    private _request;
    /**
     * @type KoaContext()
     * @private
     */
    private _ctx;
    /**
     * @type {string}
     * @private
     */
    private _originalUrl;
    /**
     * @type {HttpContext}
     */
    httpCtx: HttpContext;
    _postParams: any;
    /**
     * get Current Request Router
     * @return {Router|RouterHandle}
     * @function
     */
    getRouter(): Router | RouterHandle;
    /**
     *
     * @param {string} name
     * @return {*|null}
     */
    post(name: string): any | null;
    /**
     *
     * @param {string} name
     * @return {*|null}
     */
    get(name: string): any | null;
    /**
     * get file field value
     * @param  {string} name
     * @return {*|null}
     * @function
     */
    file(name: string): any | null;
    /**
     *
     * @return {any}
     */
    getPostAll(): any;
    /**
     * Return request header.
     * The Referrer header field is special-cased, both Referrer and Referer are interchangeable.
     * Examples:
     * this.getHeader('Content-Type'); // => “text/plain”
     * this.getHeader('content-type'); // => “text/plain”
     * this.getHeader('Something'); // => ''
     * @param {string} name
     * @return {String|null}
     *
     */
    getHeader(name: string): string | null;
    /**
     *
     * @return {*}
     * @public
     */
    public getHeaderAll(): any;
    /**
     * @param {string} name
     * @param {any} value
     * @public
     */
    public setHeader(name: string, value: any): void;
    /**
     * @param {string} method
     * @public
     */
    public setMethod(method: string): void;
    /**
     * @return {String}
     * @public
     */
    public getMethod(): string;
    /**
     * Return parsed Content-Length when present.
     * @return {Number}
     * @public
     */
    public getContentLength(): number;
    /**
     * @param {string} url
     * @public
     */
    public setUrl(url: string): void;
    /**
     * @return  {String} url
     * @public
     */
    public getUrl(): string;
    /**
     * get full request URL.
     * @return {String|string|*}
     * @public
     */
    public getOriginalUrl(): string | string | any;
    /**
     * get origin of URL.
     * @return {String}
     * @public
     */
    public getOrigin(): string;
    /**
     * get full request URL.
     * @return {String}
     * @public
     */
    public getHref(): string;
    /**
     * set pathname, retaining the query string when present.
     * @param  {String} path
     * @public
     */
    public setPath(path: string): void;
    /**
     * get request pathname.
     * @return {String}
     * @public
     */
    public getPathName(): string;
    /**
     * set query string.
     * @param  {String} querystring
     * @public
     */
    public setQuerystring(querystring: string): void;
    /**
     * get parsed query string.
     * @return {String}
     * @public
     */
    public getQuerystring(): string;
    /**
     * set the search string. Same as request.querystring= but included for ubiquity.
     * @param {String} search
     * @public
     */
    public setSearch(search: string): void;
    /**
     * get the search string. Same as the query string except it includes the leading ?.
     * @return {String}
     * @public
     */
    public getSearch(): string;
    /**
     * parse the “Host” header field host and support X-Forwarded-Host when a proxy is enabled.
     * @return {String}
     * @public
     */
    public getHost(): string;
    /**
     * parse the “Host” header field hostname and support X-Forwarded-Host when a proxy is enabled.
     * @return {String}
     * @public
     */
    public getHostname(): string;
    /**
     * get WHATWG parsed URL. Lazily memoized.
     * @public
     */
    public getWHATWG_URL(): void;
    /**
     * Check if the request is fresh, aka
     * Last-Modified and/or the ETag
     * still match.
     * @return {Boolean}
     * @public
     */
    public isFresh(): boolean;
    /**
     * Check if the request is idempotent.
     * @return {Boolean}
     * @public
     */
    public isIdempotent(): boolean;
    /**
     * Return the request socket.
     * @return {import('mysql2').Connection}
     * @public
     */
    public getSocket(): import('mysql2').Connection;
    /**
     *
     * @return {String}
     * @public
     */
    public getCharset(): string;
    /**
     * Return accepted charsets or best fit based on charsets.
     * Given Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5 an array sorted by quality is returned:
     * ['utf-8', 'utf-7', 'iso-8859-1']
     * @param {string[]}  charsets
     * @return {String|Array}
     * @public
     */
    public acceptsCharsets(charsets: string[]): string | any[];
    /**
     * Return accepted languages or best fit based on languages.
     * Given Accept-Language: en;q=0.8, es, pt an array sorted by quality is returned:
     * ['es', 'pt', 'en']
     * @param {string[]} languages
     * @return {Array|String}
     * @public
     */
    public acceptsLanguages(languages: string[]): any[] | string;
    /**
     * Return accepted encodings or best fit based on encodings.
     * Given Accept-Encoding: gzip, deflate an array sorted by quality is returned:
     * ['gzip', 'deflate']
     * @param {string[]} encodings
     * @return {String|Array}
     * @public
     */
    public acceptsEncodings(encodings: string[]): string | any[];
    /**
     * Check if the given type(s) is acceptable, returning the best match when true, otherwise false, in which case you should respond with 406 “Not Acceptable”.
     * The type value may be a single mime type string such as “application/json”, the extension name such as “json” or an array ["json", "html", "text/plain"].
     * When a list or array is given the best match, if any is returned.
     * Examples:
     * // Accept: text/html this.accepts('html'); // => “html”
     * // Accept: text/*, application/json this.accepts('html'); // => “html” this.accepts('text/html');
     * // => “text/html” this.accepts('json', 'text'); // => “json” this.accepts('application/json'); // => “application/json”
     * // Accept: text/*, application/json this.accepts('image/png'); this.accepts('png'); // => false
     * // Accept: text/*;q=.5, application/json this.accepts(['html', 'json']); this.accepts('html', 'json'); // => “json”
     * @param {...string} args
     * @return {String|Array|false}
     * @public
     */
    public accepts(...args: string[]): string | any[] | false;
    /**
     * Check if the incoming request contains the "Content-Type"
     * header field and if it contains any of the given mime `type`s.
     * If there is no request body, `null` is returned.
     * If there is no content type, `false` is returned.
     * Otherwise, it returns the first `type` that matches.
     *
     * Examples:
     *
     *     // With Content-Type: text/html; charset=utf-8
     *     this.is('html'); // => 'html'
     *     this.is('text/html'); // => 'text/html'
     *     this.is('text/*', 'application/json'); // => 'text/html'
     *
     *     // When Content-Type is application/json
     *     this.is('json', 'urlencoded'); // => 'json'
     *     this.is('application/json'); // => 'application/json'
     *     this.is('html', 'application/*'); // => 'application/json'
     *
     *     this.is('html'); // => false
     * @param {string} type
     * @param {string[]} types
     * @return {String|false|null}
     * @public
     */
    public is(type: string, ...types: string[]): string | false | null;
    /**
     * Return subdomains as an array.
     *
     * Subdomains are the dot-separated parts of the host before the main domain
     * of the app. By default, the domain of the app is assumed to be the last two
     * parts of the host. This can be changed by setting `app.subdomainOffset`.
     *
     * For example, if the domain is "tobi.ferrets.example.com":
     * If `app.subdomainOffset` is not set, this. Subdomains is
     * `["ferrets", "tobi"]`.
     * If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
     * @return {Array}
     * @public
     */
    public getSubdomains(): any[];
    /**
     * When app.proxy is true, parse the “X-Forwarded-For” ip address list. For example if the value was
     * “client, proxy1, proxy2” you would receive the array ["client", "proxy1", "proxy2"] where “proxy2” is the furthest down-stream.
     * @return {Array}
     * @public
     */
    public getIps(): any[];
    /**
     * Return request's remote address When app.proxy is true, parse the “X-Forwarded-For” ip address list and return the first one
     * @return {String}
     * @public
     */
    public getIp(): string;
    /**
     * Shorthand for: this.protocol == 'https'
     * @return {Boolean}
     * @public
     */
    public isSecure(): boolean;
    /**
     * Return the protocol string “http” or “https” when requested with TLS. When the proxy setting is enabled the “X-Forwarded-Proto”
     * header field will be trusted. If you're running behind a reverse proxy that supplies https for you this may be enabled.
     * @return {String}
     * @public
     */
    public getProtocol(): string;
    /**
     * Return the request mime type void of parameters such as “charset”.
     * @return {String}
     * @public
     */
    public getType(): string;
    /**
     * get content-type value
     * @return {String}
     * @public
     */
    public getContentType(): string;
}
import HttpContext = require("./HttpContext");
import Router = require("../../route/Router");
import RouterHandle = require("../../route/RouterHandle");

const KoaRequest = require("koa2/lib/request");
const KoaContext = require("koa2/lib/context");
const HttpContext = require("./HttpContext");
const RouterHandle = require("../../route/RouterHandle");
const Router = require("../../route/Router");
module.exports = class HttpRequest {
    /**
     * @type KoaRequest()
     * @private
     */
    _request
    /**
     * @type KoaContext()
     * @private
     */
    _ctx
    /**
     * @type {string}
     * @private
     */
    _originalUrl
    /**
     * @type {HttpContext}
     */
    httpCtx

    _postParams

    /**
     * @param httpCtx {HttpContext}
     */
    constructor(httpCtx) {

        this.httpCtx = httpCtx;
        this._ctx = httpCtx._ctx;
        this._request = httpCtx._ctx.request;
        this._originalUrl = this._request.url;
        this._postParams = httpCtx._ctx.request.body;
    }

    /**
     * Get Current Request Router
     * @return {Router|RouterHandle|function}
     * @constructor
     */
    GetRouter() {
        return this.httpCtx.GetRouter()
    }

    Post(name) {
        return this.httpCtx.App().Facades.Xss.Filter(this._postParams[name]) || null
    }

    Get(name) {
        return this.httpCtx.App().Facades.Xss.Filter(this._request.query[name]) || null
    }

    /**
     * get file field value
     * @param name
     * @return {*|null}
     * @function
     */
    File(name) {
        return this._request.files[name] || null
    }

    GetPostAll() {
        return this._request._postParams
    }

    /**
     * Return request header.
     * The Referrer header field is special-cased, both Referrer and Referer are interchangeable.
     * Examples:
     * this.getHeader('Content-Type'); // => “text/plain”
     * this.getHeader('content-type'); // => “text/plain”
     * this.getHeader('Something'); // => ''
     * @return {String|null}
     *
     */
    GetHeader(name) {
        return name ? this._request.get(name) : null
    }

    /**
     *
     * @return {*}
     * @public
     */
    GetHeaderAll() {
        return this._request.headers;
    }

    /**
     * @param name  {string}
     * @param value  {any}
     * @public
     */
    SetHeader(name, value) {
        this._request.headers[name] = value;
    }

    /**
     * @param method
     * @public
     */
    SetMethod(method) {
        if (method) {
            this._request.method = method;
        }
    }

    /**
     * @return {String}
     * @public
     */
    GetMethod() {
        return this._request.method;
    }

    /**
     * Return parsed Content-Length when present.
     * @return {Number}
     * @public
     */
    GetContentLength() {
        return this._request.length;
    }

    /**
     * @param url {string}
     * @public
     */
    SetUrl(url) {
        if (url) {
            this._request.url = url;
        }
    }

    /**
     * @return  url {String}
     * @public
     */
    GetUrl() {
        return this._request.url;
    }

    /**
     * Get full request URL.
     * @return {String|string|*}
     * @public
     */
    GetOriginalUrl() {
        return this._originalUrl;
    }

    /**
     * Get origin of URL.
     * @return {String}
     * @public
     */
    GetOrigin() {
        return this._request.origin;
    }

    /**
     * Get full request URL.
     * @return {String}
     * @public
     */
    GetHref() {
        return this._request.href;
    }

    /**
     * Set pathname, retaining the query string when present.
     * @param path {String}
     * @public
     */
    SetPath(path) {
        if (path) {
            this._request.path = path
        }
    }

    /**
     * Get request pathname.
     * @return {String}
     * @public
     */
    GetPathName() {
        return this._request.path
    }

    /**
     * Set query string.
     * @param querystring {String}
     * @public
     */
    SetQuerystring(querystring) {
        if (querystring) {
            this._request.querystring = querystring
        }
    }

    /**
     * Get parsed query string.
     * @return {String}
     * @public
     */
    GetQuerystring() {
        return this.httpCtx.App().Facades.Xss.Filter(this._request.querystring)
    }

    /**
     * Set the search string. Same as request.querystring= but included for ubiquity.
     * @param search {String}
     * @public
     */
    SetSearch(search) {
        if (search) {
            this._request.search = search
        }
    }

    /**
     * Get the search string. Same as the query string except it includes the leading ?.
     * @return {String}
     * @public
     */
    GetSearch() {
        return this._request.search
    }

    /**
     * Parse the “Host” header field host and support X-Forwarded-Host when a proxy is enabled.
     * @return {String}
     * @public
     */
    GetHost() {
        return this._request.host
    }

    /**
     * Parse the “Host” header field hostname and support X-Forwarded-Host when a proxy is enabled.
     * @return {String}
     * @public
     */
    GetHostname() {
        return this._request.hostname
    }

    /**
     * Get WHATWG parsed URL. Lazily memoized.
     * @public
     */
    GetWHATWG_URL() {
        this._request.URL
    }

    /**
     * Check if the request is fresh, aka
     * Last-Modified and/or the ETag
     * still match.
     * @return {Boolean}
     * @public
     */
    IsFresh() {
        return this._request.fresh
    }

    /**
     * Check if the request is idempotent.
     * @return {Boolean}
     * @public
     */
    IsIdempotent() {
        return this._request.idempotent
    }

    /**
     * Return the request socket.
     * @return Connection
     * @public
     */
    GetSocket() {
        return this._request.socket
    }

    /**
     *
     * @return {String}
     * @public
     */
    GetCharset() {
        return this._request.charset
    }


    /**
     * Return accepted charsets or best fit based on charsets.
     * Given Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5 an array sorted by quality is returned:
     * ['utf-8', 'utf-7', 'iso-8859-1']
     * @param charsets
     * @return {String|Array}
     * @public
     */
    AcceptsCharsets(charsets) {
        return this._request.acceptsCharsets(charsets)
    }

    /**
     * Return accepted languages or best fit based on languages.
     * Given Accept-Language: en;q=0.8, es, pt an array sorted by quality is returned:
     * ['es', 'pt', 'en']
     * @param languages
     * @return {Array|String}
     * @public
     */
    AcceptsLanguages(languages) {
        return this._request.acceptsLanguages(languages)
    }

    /**
     * Return accepted encodings or best fit based on encodings.
     * Given Accept-Encoding: gzip, deflate an array sorted by quality is returned:
     * ['gzip', 'deflate']
     * @param encodings
     * @return {String|Array}
     * @public
     */
    AcceptsEncodings(encodings) {
        return this._request.acceptsEncodings(encodings)
    }

    /**
     * Check if the given type(s) is acceptable, returning the best match when true, otherwise false, in which case you should respond with 406 “Not Acceptable”.
     * The type value may be a single mime type string such as “application/json”, the extension name such as “json” or an array ["json", "html", "text/plain"]. When a list or array is given the best match, if any is returned.
     * Examples:
     * // Accept: text/html this.accepts('html'); // => “html”
     * // Accept: text/*, application/json this.accepts('html'); // => “html” this.accepts('text/html'); // => “text/html” this.accepts('json', 'text'); // => “json” this.accepts('application/json'); // => “application/json”
     * // Accept: text/*, application/json this.accepts('image/png'); this.accepts('png'); // => false
     * // Accept: text/*;q=.5, application/json this.accepts(['html', 'json']); this.accepts('html', 'json'); // => “json”
     * @param args
     * @return {String|Array|false}
     * @public
     */
    Accepts(...args) {
        return this._request.accepts(...args)
    }

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
     * @param type
     * @param types
     * @return {String|false|null}
     * @public
     */
    Is(type, ...types) {
        return this._request.is(type, ...types)
    }

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
    GetSubdomains() {
        return this._request.subdomains
    }

    /**
     * When app.proxy is true, parse the “X-Forwarded-For” ip address list. For example if the value was “client, proxy1, proxy2” you would receive the array ["client", "proxy1", "proxy2"] where “proxy2” is the furthest down-stream.
     * @return {Array}
     * @public
     */
    GetIps() {
        return this._request.ips
    }

    /**
     * Return request's remote address When app.proxy is true, parse the “X-Forwarded-For” ip address list and return the first one
     * @return {String}
     * @public
     */
    GetIp() {
        return this._request.ip
    }

    /**
     * Shorthand for: this.protocol == 'https'
     * @return {Boolean}
     * @public
     */
    IsSecure() {
        return this.GetProtocol() == 'https'
    }

    /**
     * Return the protocol string “http” or “https” when requested with TLS. When the proxy setting is enabled the “X-Forwarded-Proto” header field will be trusted. If you're running behind a reverse proxy that supplies https for you this may be enabled.
     * @return {String}
     * @public
     */
    GetProtocol() {
        return this._request.protocol
    }

    /**
     * Return the request mime type void of parameters such as “charset”.
     * @return {String}
     * @public
     */
    GetType() {
        return this._request.type
    }

    /**
     * Get content-type value
     * @return {String}
     * @public
     */
    GetContentType() {
        return this.Get('content-type')
    }


}

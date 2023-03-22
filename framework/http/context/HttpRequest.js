const KoaRequest = require('koa2/lib/request');
const KoaContext = require('koa2/lib/context');
const HttpContext = require('./HttpContext');
const RouterHandle = require('../../route/RouterHandle');
const Router = require('../../route/Router');
module.exports = class HttpRequest {
    /**
     * @type KoaRequest()
     * @private
     */
    _request;
    /**
     * @type KoaContext()
     * @private
     */
    _ctx;
    /**
     * @type {string}
     * @private
     */
    _originalUrl;
    /**
     * @type {HttpContext}
     */
    httpCtx;

    _postParams;

    /**
     * @param  {HttpContext} httpCtx
     */
    constructor(httpCtx) {
        this.httpCtx = httpCtx;
        this._ctx = httpCtx._ctx;
        this._request = httpCtx._ctx.request;
        this._originalUrl = this._request.url;
        this._postParams = httpCtx._ctx.request.body;
    }

    /**
     * get Current Request Router
     * @return {Router|RouterHandle}
     * @function
     */
    getRouter() {
        return this.httpCtx.getRouter();
    }

    /**
     *
     * @param {string} name
     * @return {*|null}
     */
    post(name) {
        return this.httpCtx.app().facades.Xss.filter(this._postParams[name]) || null;
    }

    /**
     *
     * @param {string} name
     * @return {*|null}
     */
    get(name) {
        return this.httpCtx.app().facades.Xss.filter(this._request.query[name]) || null;
    }

    /**
     * get file field value
     * @param  {string} name
     * @return {*|null}
     * @function
     */
    file(name) {
        return this._request.files[name] || null;
    }

    /**
     *
     * @return {any}
     */
    getPostAll() {
        return this._request._postParams;
    }

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
    getHeader(name) {
        return name ? this._request.get(name) : null;
    }

    /**
     *
     * @return {*}
     * @public
     */
    getHeaderAll() {
        return this._request.headers;
    }

    /**
     * @param {string} name
     * @param {any} value
     * @public
     */
    setHeader(name, value) {
        this._request.headers[name] = value;
    }

    /**
     * @param {string} method
     * @public
     */
    setMethod(method) {
        if (method) {
            this._request.method = method;
        }
    }

    /**
     * @return {String}
     * @public
     */
    getMethod() {
        return this._request.method;
    }

    /**
     * Return parsed Content-Length when present.
     * @return {Number}
     * @public
     */
    getContentLength() {
        return this._request.length;
    }

    /**
     * @param {string} url
     * @public
     */
    setUrl(url) {
        if (url) {
            this._request.url = url;
        }
    }

    /**
     * @return  {String} url
     * @public
     */
    getUrl() {
        return this._request.url;
    }

    /**
     * get full request URL.
     * @return {String|string|*}
     * @public
     */
    getOriginalUrl() {
        return this._originalUrl;
    }

    /**
     * get origin of URL.
     * @return {String}
     * @public
     */
    getOrigin() {
        return this._request.origin;
    }

    /**
     * get full request URL.
     * @return {String}
     * @public
     */
    getHref() {
        return this._request.href;
    }

    /**
     * set pathname, retaining the query string when present.
     * @param  {String} path
     * @public
     */
    setPath(path) {
        if (path) {
            this._request.path = path;
        }
    }

    /**
     * get request pathname.
     * @return {String}
     * @public
     */
    getPathName() {
        return this._request.path;
    }

    /**
     * set query string.
     * @param  {String} querystring
     * @public
     */
    setQuerystring(querystring) {
        if (querystring) {
            this._request.querystring = querystring;
        }
    }

    /**
     * get parsed query string.
     * @return {String}
     * @public
     */
    getQuerystring() {
        return this.httpCtx.app().facades.Xss.filter(this._request.querystring);
    }

    /**
     * set the search string. Same as request.querystring= but included for ubiquity.
     * @param {String} search
     * @public
     */
    setSearch(search) {
        if (search) {
            this._request.search = search;
        }
    }

    /**
     * get the search string. Same as the query string except it includes the leading ?.
     * @return {String}
     * @public
     */
    getSearch() {
        return this._request.search;
    }

    /**
     * parse the “Host” header field host and support X-Forwarded-Host when a proxy is enabled.
     * @return {String}
     * @public
     */
    getHost() {
        return this._request.host;
    }

    /**
     * parse the “Host” header field hostname and support X-Forwarded-Host when a proxy is enabled.
     * @return {String}
     * @public
     */
    getHostname() {
        return this._request.hostname;
    }

    /**
     * get WHATWG parsed URL. Lazily memoized.
     * @public
     */
    getWHATWG_URL() {
        this._request.URL;
    }

    /**
     * Check if the request is fresh, aka
     * Last-Modified and/or the ETag
     * still match.
     * @return {Boolean}
     * @public
     */
    isFresh() {
        return this._request.fresh;
    }

    /**
     * Check if the request is idempotent.
     * @return {Boolean}
     * @public
     */
    isIdempotent() {
        return this._request.idempotent;
    }

    /**
     * Return the request socket.
     * @return {*}
     * @public
     */
    getSocket() {
        return this._request.socket;
    }

    /**
     *
     * @return {String}
     * @public
     */
    getCharset() {
        return this._request.charset;
    }


    /**
     * Return accepted charsets or best fit based on charsets.
     * Given Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5 an array sorted by quality is returned:
     * ['utf-8', 'utf-7', 'iso-8859-1']
     * @param {string[]}  charsets
     * @return {String|Array}
     * @public
     */
    acceptsCharsets(charsets) {
        return this._request.acceptsCharsets(charsets);
    }

    /**
     * Return accepted languages or best fit based on languages.
     * Given Accept-Language: en;q=0.8, es, pt an array sorted by quality is returned:
     * ['es', 'pt', 'en']
     * @param {string[]} languages
     * @return {Array|String}
     * @public
     */
    acceptsLanguages(languages) {
        return this._request.acceptsLanguages(languages);
    }

    /**
     * Return accepted encodings or best fit based on encodings.
     * Given Accept-Encoding: gzip, deflate an array sorted by quality is returned:
     * ['gzip', 'deflate']
     * @param {string[]} encodings
     * @return {String|Array}
     * @public
     */
    acceptsEncodings(encodings) {
        return this._request.acceptsEncodings(encodings);
    }

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
    accepts(...args) {
        return this._request.accepts(...args);
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
     * @param {string} type
     * @param {string[]} types
     * @return {String|false|null}
     * @public
     */
    is(type, ...types) {
        return this._request.is(type, ...types);
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
    getSubdomains() {
        return this._request.subdomains;
    }

    /**
     * When app.proxy is true, parse the “X-Forwarded-For” ip address list. For example if the value was
     * “client, proxy1, proxy2” you would receive the array ["client", "proxy1", "proxy2"] where “proxy2” is the furthest down-stream.
     * @return {Array}
     * @public
     */
    getIps() {
        return this._request.ips;
    }

    /**
     * Return request's remote address When app.proxy is true, parse the “X-Forwarded-For” ip address list and return the first one
     * @return {String}
     * @public
     */
    getIp() {
        return this._request.ip;
    }

    /**
     * Shorthand for: this.protocol == 'https'
     * @return {Boolean}
     * @public
     */
    isSecure() {
        return this.getProtocol() == 'https';
    }

    /**
     * Return the protocol string “http” or “https” when requested with TLS. When the proxy setting is enabled the “X-Forwarded-Proto”
     * header field will be trusted. If you're running behind a reverse proxy that supplies https for you this may be enabled.
     * @return {String}
     * @public
     */
    getProtocol() {
        return this._request.protocol;
    }

    /**
     * Return the request mime type void of parameters such as “charset”.
     * @return {String}
     * @public
     */
    getType() {
        return this._request.type;
    }

    /**
     * get content-type value
     * @return {String}
     * @public
     */
    getContentType() {
        return this.get('content-type');
    }
};

export = HttpRequest;
declare class HttpRequest {
    /**
     * @param ctx
     */
    constructor(ctx: any);
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
     *
     * @param name? {string}
     * @return {*|null}
     * @constructor
     */
    GetHeader(name: any): any | null;
    /**
     *
     * @return {*}
     * @public
     */
    public GetHeaderAll(): any;
    /**
     * @param name  {string}
     * @param value  {any}
     * @public
     */
    public SetHeader(name: string, value: any): void;
    /**
     * @param method
     * @public
     */
    public SetMethod(method: any): void;
    /**
     * @return {String}
     * @public
     */
    public GetMethod(): string;
    /**
     * Return parsed Content-Length when present.
     * @return {Number}
     * @public
     */
    public GetContentLength(): number;
    /**
     * @param url {string}
     * @public
     */
    public SetUrl(url: string): void;
    /**
     * @return  url {String}
     * @public
     */
    public GetUrl(): any;
    /**
     * Get full request URL.
     * @return {String|string|*}
     * @public
     */
    public GetOriginalUrl(): string | string | any;
    /**
     * Get origin of URL.
     * @return {String}
     * @public
     */
    public GetOrigin(): string;
    /**
     * Get full request URL.
     * @return {String}
     * @public
     */
    public GetHref(): string;
    /**
     * Set pathname, retaining the query string when present.
     * @param path {String}
     * @public
     */
    public SetPath(path: string): void;
    /**
     * Get request pathname.
     * @return {String}
     * @public
     */
    public GetPath(): string;
    /**
     * Set query string.
     * @param querystring {String}
     * @public
     */
    public SetQuerystring(querystring: string): void;
    /**
     * Get parsed query string.
     * @return {String}
     * @public
     */
    public GetQuerystring(): string;
    /**
     * Set the search string. Same as request.querystring= but included for ubiquity.
     * @param search {String}
     * @public
     */
    public SetSearch(search: string): void;
    /**
     * Get the search string. Same as the query string except it includes the leading ?.
     * @return {String}
     * @public
     */
    public GetSearch(): string;
    /**
     * Parse the “Host” header field host and support X-Forwarded-Host when a proxy is enabled.
     * @return {String}
     * @public
     */
    public GetHost(): string;
    /**
     * Parse the “Host” header field hostname and support X-Forwarded-Host when a proxy is enabled.
     * @return {String}
     * @public
     */
    public GetHostname(): string;
    /**
     * Get WHATWG parsed URL. Lazily memoized.
     * @public
     */
    public GetWHATWG_URL(): void;
    /**
     * Check if the request is fresh, aka
     * Last-Modified and/or the ETag
     * still match.
     * @return {Boolean}
     * @public
     */
    public IsFresh(): boolean;
    /**
     * Check if the request is idempotent.
     * @return {Boolean}
     * @public
     */
    public IsIdempotent(): boolean;
    /**
     * Return the request socket.
     * @return Connection
     * @public
     */
    public GetSocket(): any;
    /**
     *
     * @return {String}
     * @public
     */
    public GetCharset(): string;
    /**
     * Return request header.
     * The Referrer header field is special-cased, both Referrer and Referer are interchangeable.
     * Examples:
     * this.get('Content-Type'); // => “text/plain”
     * this.get('content-type'); // => “text/plain”
     * this.get('Something'); // => ''
     * @return {String}
     *
     */
    Get(field: any): string;
    /**
     * Return accepted charsets or best fit based on charsets.
     * Given Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5 an array sorted by quality is returned:
     * ['utf-8', 'utf-7', 'iso-8859-1']
     * @param charsets
     * @return {String|Array}
     * @public
     */
    public AcceptsCharsets(charsets: any): string | any[];
    /**
     * Return accepted languages or best fit based on languages.
     * Given Accept-Language: en;q=0.8, es, pt an array sorted by quality is returned:
     * ['es', 'pt', 'en']
     * @param languages
     * @return {Array|String}
     * @public
     */
    public AcceptsLanguages(languages: any): any[] | string;
    /**
     * Return accepted encodings or best fit based on encodings.
     * Given Accept-Encoding: gzip, deflate an array sorted by quality is returned:
     * ['gzip', 'deflate']
     * @param encodings
     * @return {String|Array}
     * @public
     */
    public AcceptsEncodings(encodings: any): string | any[];
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
    public Accepts(...args: any[]): string | any[] | false;
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
    public Is(type: any, ...types: any[]): string | false | null;
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
    public GetSubdomains(): any[];
    /**
     * When app.proxy is true, parse the “X-Forwarded-For” ip address list. For example if the value was “client, proxy1, proxy2” you would receive the array ["client", "proxy1", "proxy2"] where “proxy2” is the furthest down-stream.
     * @return {Array}
     * @public
     */
    public GetIps(): any[];
    /**
     * Return request's remote address When app.proxy is true, parse the “X-Forwarded-For” ip address list and return the first one
     * @return {String}
     * @public
     */
    public GetIp(): string;
    /**
     * Shorthand for: this.protocol == 'https'
     * @return {Boolean}
     * @public
     */
    public IsSecure(): boolean;
    /**
     * Return the protocol string “http” or “https” when requested with TLS. When the proxy setting is enabled the “X-Forwarded-Proto” header field will be trusted. If you're running behind a reverse proxy that supplies https for you this may be enabled.
     * @return {String}
     * @public
     */
    public GetProtocol(): string;
    /**
     * Return the request mime type void of parameters such as “charset”.
     * @return {String}
     * @public
     */
    public GetType(): string;
    /**
     * Get content-type value
     * @return {String}
     * @public
     */
    public GetContentType(): string;
}

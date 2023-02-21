export = HttpResponse;
declare class HttpResponse {
    constructor(ctx: any);
    /**
     *
     * @type {HttpResponseWrite}
     */
    output: HttpResponseWrite;
    /**
     * @type KoaResponse()
     * @private
     */
    private _response;
    WriteBytes(bytes: any): void;
    WriteText(text: any): void;
    /**
     * Set Content-Type response header with type through mime.lookup() when it does not contain a charset.
     * @param type
     * @public
     */
    public SetContentType(type: any): void;
    /**
     *
     * @return {String|string|*}
     * @public
     */
    public GetContentType(): string | string | any;
    /**
     * Perform a 302 redirect to url.
     * The string “back” is special-cased to provide Referrer support, when Referrer is not present alt or “/” is used.
     * Examples:
     * this.redirect('back'); this.redirect('back', '/index.html'); this.redirect('/login'); this.redirect('http://google.com');
     * @param url
     * @param alt
     * @public
     */
    public Redirect(url: any, alt: any): void;
    /**
     * @param name
     * @return {*|null}
     * @public
     */
    public GetHeader(name: any): any | null;
    /**
     *
     * @return {*}
     * @constructor
     */
    GetHeaderAll(): any;
    /**
     * Set header `field` to `val` or pass
     * an object of header fields.
     *
     * Examples:
     *
     *    ctx.Response.SetHeader('Foo', ['bar', 'baz']);
     *    ctx.Response.SetHeader('Accept', 'application/json');
     *    ctx.Response.SetHeader({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
     * @param {String|Object|Array} field
     * @param value {any?}
     * @public
     */
    public SetHeader(field: string | any | any[], value: any | null): void;
    /**
     * Append additional header field with value val.
     * Examples:
     * ctx.Response.AppendHeader('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
     * ctx.Response.AppendHeader('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
     * ctx.Response.AppendHeader('Warning', '199 Miscellaneous warning');
     * @param field
     * @param value
     * @public
     */
    public AppendHeader(field: any, value: any): void;
    /**
     * Set response status code.
     * @param code
     * @public
     */
    public SetStatus(code?: number): void;
    /**
     * Remove header field.
     * @param field
     * @public
     */
    public RemoveHeader(field: any): void;
    /**
     * Get response status code.
     * @description
     * 100 "continue"
     * 101 "switching protocols"
     * 102 "processing"
     * 200 "ok"
     * 201 "created"
     * 202 "accepted"
     * 203 "non-authoritative information"
     * 204 "no content"
     * 205 "reset content"
     * 206 "partial content"
     * 207 "multi-status"
     * 208 "already reported"
     * 226 "im used"
     * 300 "multiple choices"
     * 301 "moved permanently"
     * 302 "found"
     * 303 "see other"
     * 304 "not modified"
     * 305 "use proxy"
     * 307 "temporary redirect"
     * 308 "permanent redirect"
     * 400 "bad request"
     * 401 "unauthorized"
     * 402 "payment required"
     * 403 "forbidden"
     * 404 "not found"
     * 405 "method not allowed"
     * 406 "not acceptable"
     * 407 "proxy authentication required"
     * 408 "request timeout"
     * 409 "conflict"
     * 410 "gone"
     * 411 "length required"
     * 412 "precondition failed"
     * 413 "payload too large"
     * 414 "uri too long"
     * 415 "unsupported media type"
     * 416 "range not satisfiable"
     * 417 "expectation failed"
     * 418 "I'm a teapot"
     * 422 "unprocessable entity"
     * 423 "locked"
     * 424 "failed dependency"
     * 426 "upgrade required"
     * 428 "precondition required"
     * 429 "too many requests"
     * 431 "request header fields too large"
     * 500 "internal server error"
     * 501 "not implemented"
     * 502 "bad gateway"
     * 503 "service unavailable"
     * 504 "gateway timeout"
     * 505 "http version not supported"
     * 506 "variant also negotiates"
     * 507 "insufficient storage"
     * 508 "loop detected"
     * 510 "not extended"
     * 511 "network authentication required"
     * @public
     */
    public GetStatus(): any;
    /**
     * Set response status message
     * @param message
     * @public
     */
    public SetStatusMessage(message: any): void;
    /**
     * Get response status message
     * @param message
     * @return {String}
     * @public
     */
    public GetStatusMessage(message: any): string;
    /**
     * Return parsed response Content-Length when present.
     * @return {Number|number|*}
     * @public
     */
    public GetContentLength(): number | number | any;
    /**
     * Set Content-Length field to n.
     * @param contentLength
     * @public
     */
    public SetContentLength(contentLength: any): void;
    /**
     * Set response body.
     * @param {String|Buffer|Object} val
     * string written
     * Buffer written
     * Stream piped
     * Object || Array json-stringified
     * null no content response
     * @public
     */
    public SetBody(val: string | Buffer | any): void;
    /**
     * Get response body.
     * @return {null|*}
     * @public
     */
    public GetBody(): null | any;
    /**
     * Check whether the response is one of the listed types.
     * Pretty much the same as `ctx.request.Is()`.
     * @param type
     * @param types
     * @return {String|false}
     * @public
     */
    public Is(type: any, ...types: any[]): string | false;
    /**
     * Set Content-Disposition header to "attachment" with optional `filename`.
     * @param filename
     * @param options
     */
    SetAttachment(filename: any, options: any): void;
    /**
     * Check if a header has been written to the socket.
     * @return {Boolean}
     * @public
     */
    public CheckHeaderSent(): boolean;
    /**
     * get the Last-Modified date using a string or a Date
     * @return {Date}
     * @public
     */
    public GetLastModified(): Date;
    /**
     * set the Last-Modified date using a string or a Date.
     *
     *     this.lastModified(new Date());
     *     this.lastModified('2013-09-13');
     * @param date {Date}
     * @public
     */
    public SetLastModified(date: Date): void;
    /**
     * Set the ETag of a response.
     * This will normalize the quotes if necessary.
     * @example
     *     this.SetETag('md5hashsum');
     *     this.SetETag('"md5hashsum"');
     *     this.SetETag('W/"123456789"');
     *
     * @param {String} val
     */
    SetETag(val: string): void;
    /**
     * Flush any set headers and begin the body
     * @public
     */
    public FlushHeaders(): void;
}
import HttpResponseWrite = require("./HttpResponseWrite");

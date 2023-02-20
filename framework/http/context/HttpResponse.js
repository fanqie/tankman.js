/** @typedef {typeof import('./HttpResponseWrite')} HttpResponseWrite */
/** @typedef {typeof import('koa/lib/response')} KoaResponse */
/** @typedef {typeof import('koa/lib/context')} KoaContext */
const ResponseWrite = require("./HttpResponseWrite");
module.exports = class HttpResponse {
    /**
     *
     * @type {HttpResponseWrite}
     */
    output
    /**
     * @type KoaResponse
     * @private
     */
    _response

    constructor(ctx) {
        this.output = new ResponseWrite(ctx)
    }

    WriteBytes(bytes) {
        this._response.body = bytes
    }

    WriteText(text) {
        this._response.body = text
    }

    /**
     * Set Content-Type response header with type through mime.lookup() when it does not contain a charset.
     * @param type
     * @constructor
     */
    SetContentType(type) {
        this._response.type = type;
    }

    /**
     *
     * @return {String|string|*}
     * @constructor
     */
    GetContentType() {
        return this._response.type;
    }

    /**
     * Perform a 302 redirect to url.
     * The string “back” is special-cased to provide Referrer support, when Referrer is not present alt or “/” is used.
     * Examples:
     * this.redirect('back'); this.redirect('back', '/index.html'); this.redirect('/login'); this.redirect('http://google.com');
     * @param url
     * @param alt
     * @constructor
     */
    Redirect(url, alt) {
        this._response.redirect(url, alt)
    }

    /**
     * @param name
     * @return {*|null}
     * @constructor
     */
    GetHeader(name) {
        return name ? this._response.get(name) : null
    }

    /**
     * @return {exports.header}
     * @constructor
     */
    GetHeaderAll() {
        return this._response.headers;
    }

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
     * @constructor
     */
    SetHeader(field, value) {
        typeof field == "string" ? this._response.set(field, value) : this._response.set(field);
    }

    /**
     * Append additional header field with value val.
     * Examples:
     * ctx.Response.AppendHeader('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
     * ctx.Response.AppendHeader('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
     * ctx.Response.AppendHeader('Warning', '199 Miscellaneous warning');
     * @param field
     * @param value
     * @constructor
     */
    AppendHeader(field, value) {
        this.SetHeader(field, value)
    }

    /**
     * Set response status code.
     * @param code
     * @constructor
     */
    SetStatus(code = 200) {
        this._response.status = code
    }

    /**
     * Remove header field.
     * @param field
     * @constructor
     */
    RemoveHeader(field) {
        this._response.remove(field)
    }

    /**
     * Get response status code.
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
     * @constructor
     */
    GetStatus() {
        return this._response.status
    }

    /**
     * Set response status message
     * @param message
     * @constructor
     */
    SetStatusMessage(message) {
        this._response.message = message
    }

    /**
     * Get response status message
     * @param message
     * @return {String}
     * @constructor
     */
    GetStatusMessage(message) {
        return this._response.message
    }

    /**
     * Return parsed response Content-Length when present.
     * @return {Number|number|*}
     * @constructor
     */
    GetContentLength() {
        return this._response.length;
    }

    /**
     * Set Content-Length field to n.
     * @param contentLength
     * @constructor
     */
    SetContentLength(contentLength) {
        this._response.length = contentLength;
    }

    /**
     * Set response body.
     * @param {String|Buffer|Object|Stream} val
     * string written
     * Buffer written
     * Stream piped
     * Object || Array json-stringified
     * null no content response
     * @constructor
     */
    SetBody(val) {
        this._response.body = val
    }

    /**
     * Get response body.
     * @return {Mixed|null|*}
     * @constructor
     */
    GetBody() {
        return this._response.body
    }

    /**
     * Check whether the response is one of the listed types.
     * Pretty much the same as `ctx.request.is()`.
     * @param type
     * @param types
     * @return {String|false}
     * @constructor
     */
    Is(type, ...types) {
        return this._response.is(type, ...types)
    }

    /**
     * Set Content-Disposition header to "attachment" with optional `filename`.
     * @param filename
     * @param options
     */
    SetAttachment(filename, options) {
        this._response.attachment(filename, options)
    }

    /**
     * Check if a header has been written to the socket.
     * @return {Boolean}
     * @constructor
     */
    CheckHeaderSent() {
        return this._response.headerSent
    }

    /**
     * Set the Last-Modified date using a string or a Date.
     *
     *     this.response.lastModified = new Date();
     *     this.response.lastModified = '2013-09-13';
     * @return {Date}
     * @constructor
     */
    GetLastModified() {
        return this._response.lastModified
    }

    /**
     * Set the Last-Modified date in Date form, if it exists.
     * @param date {Date}
     * @constructor
     */
    SetLastModified(date) {
        this._response.lastModified = date
    }

    /**
     * Set the ETag of a response.
     * This will normalize the quotes if necessary.
     *
     *     this.response.etag = 'md5hashsum';
     *     this.response.etag = '"md5hashsum"';
     *     this.response.etag = 'W/"123456789"';
     *
     * @param {String} etag
     */
    SetETag(val) {
        this._response.etag = val
    }

    /**
     * Flush any set headers and begin the body
     * @constructor
     */
    FlushHeaders() {
        this._response.flushHeaders()
    }
}

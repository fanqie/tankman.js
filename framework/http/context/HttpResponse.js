// @ts-nocheck
const HttpResponseWrite = require('./HttpResponseWrite');
const KoaResponse = require('koa2/lib/response');
const mineTypes = require('mime-types');
module.exports = class HttpResponse extends HttpResponseWrite {
    /**
     * @type KoaResponse()
     * @private
     */
    _response;

    constructor(httpCtx) {
        super(httpCtx);
        this._response = httpCtx._ctx.response;
    }

    /**
     * @param {*} bytes
     * @override
     */
    writeBytes(bytes) {
        this._response.body = bytes;
    }

    /**
     * @param {string} text
     * @return {*}
     * @override
     */
    writeText(text) {
        this._response.body = text;
    }

    /**
     *
     * @param {*} buffers
     * @return {*}
     * @override
     */
    writeBuffer(buffers) {
        this._response.body = buffers;
    }

    /**
     *
     * @param {*} stream
     * @return {*}
     * @override
     */
    writeStream(stream) {
        this._response.body = stream;
    }

    /**
     * set Content-Type response header with type through mime.lookup() when it does not contain a charset.
     * @param {string} type
     * @public
     */
    setContentType(type) {
        this._response.type = type;
    }

    /**
     *
     * @return {String|string|*}
     * @public
     */
    getContentType() {
        return this._response.type;
    }

    /**
     * Perform a 302 redirect to url.
     * The string “back” is special-cased to provide Referrer support, when Referrer is not present alt or “/” is used.
     * Examples:
     * this.redirect('back'); this.redirect('back', '/index.html'); this.redirect('/login'); this.redirect('http://google.com');
     * @param {string} url
     * @param {string} alt
     * @public
     */
    redirect(url, alt) {
        this._response.redirect(url, alt);
    }

    /**
     * @param {string} name
     * @return {*|null}
     * @public
     */
    getHeader(name) {
        return name ? this._response.get(name) : null;
    }

    /**
     *
     * @return {*}
     * @constructor
     */
    getHeaderAll() {
        return this._response.headers;
    }

    /**
     * set header `field` to `val` or pass
     * an object of header fields.
     *
     * Examples:
     *
     *    ctx.Response.setHeader('Foo', ['bar', 'baz']);
     *    ctx.Response.setHeader('Accept', 'application/json');
     *    ctx.Response.setHeader({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
     * @param {String|Object|Array} field
     * @param {any} [value=""]
     * @public
     */
    setHeader(field, value) {
        typeof field == 'string' ? this._response.set(field, value) : this._response.set(field);
    }

    /**
     * Append additional header field with value val.
     * Examples:
     * ctx.Response.appendHeader('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
     * ctx.Response.appendHeader('set-Cookie', 'foo=bar; Path=/; HttpOnly');
     * ctx.Response.appendHeader('Warning', '199 Miscellaneous warning');
     * @param {string} field
     * @param {string} value
     * @public
     */
    appendHeader(field, value) {
        this.setHeader(field, value);
    }

    /**
     * set response status code.
     * @param {number} code
     * @public
     */
    setStatus(code = 200) {
        this._response.status = code;
    }

    /**
     * remove header field.
     * @param {string} field
     * @public
     */
    removeHeader(field) {
        this._response.remove(field);
    }

    /**
     * get response status code.
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
     * @return {*}
     * @public
     */
    getStatus() {
        return this._response.status;
    }

    /**
     * set response status message
     * @param {string} message
     * @public
     */
    setStatusMessage(message) {
        this._response.message = message;
    }

    /**
     * get response status message
     * @param  {string} message
     * @return {String}
     * @public
     */
    getStatusMessage(message) {
        return this._response.message;
    }

    /**
     * Return parsed response Content-Length when present.
     * @return {Number|number|*}
     * @public
     */
    getContentLength() {
        return this._response.length;
    }

    /**
     * set Content-Length field to n.
     * @param {number} contentLength
     * @public
     */
    setContentLength(contentLength) {
        this._response.length = contentLength;
    }

    /**
     * set response body.
     * @param {String|Buffer|Object} val
     * string written
     * Buffer written
     * Stream piped
     * Object || Array json-stringified
     * null no content response
     * @public
     */
    setBody(val) {
        this._response.body = val;
    }

    /**
     * get response body.
     * @return {null|*}
     * @public
     */
    getBody() {
        return this._response.body;
    }

    /**
     * Check whether the response is one of the listed types.
     * Pretty much the same as `ctx.request.is()`.
     * @param {string} type
     * @param {[]} types
     * @return {String|false}
     * @public
     */
    is(type, ...types) {
        return this._response.is(type, ...types);
    }

    /**
     * set Content-Disposition header to "attachment" with optional `filename`.
     * @param {string} filename
     * @param {Object} options
     */
    setAttachment(filename, options) {
        this._response.attachment(filename, options);
    }

    /**
     * Check if a header has been written to the socket.
     * @return {Boolean}
     * @public
     */
    checkHeaderSent() {
        return this._response.headerSent;
    }

    /**
     * get the Last-Modified date using a string or a Date
     * @return {Date}
     * @public
     */
    getLastModified() {
        return this._response.lastModified;
    }

    /**
     * set the Last-Modified date using a string or a Date.
     *
     *     this.lastModified(new Date());
     *     this.lastModified('2013-09-13');
     * @param {Date} date
     * @public
     */
    setLastModified(date) {
        this._response.lastModified = date;
    }

    /**
     * set the ETag of a response.
     * This will normalize the quotes if necessary.
     * @example
     *     this.setETag('md5hashsum');
     *     this.setETag('"md5hashsum"');
     *     this.setETag('W/"123456789"');
     *
     * @param {String} val
     */
    setETag(val) {
        this._response.etag = val;
    }

    /**
     * flush any set headers and begin the body
     * @public
     */
    flushHeaders() {
        this._response.flushHeaders();
    }
};

export = HttpResponseWrite;
/**
 * @abstract
 */
declare class HttpResponseWrite {
    constructor(httpCtx: any);
    _config: {
        json: {
            template: {
                err_no: string;
                data: string;
                err_msg: string;
                time: string;
            };
            defaultErrNo: {
                success: number;
                error: number;
            };
        };
    };
    _response: any;
    /**
     * @type HttpContext
     * @private
     */
    private _httpCtx;
    httpCtx: any;
    jsonFree(json: any): void;
    json(data: any, errMsg: any, errNo: any): void;
    jsonSuccess(data: any, errMsg?: string): void;
    jsonError(data: any, errMsg: any, errNo?: number): void;
    download(filePath: any, fileName: any, headers: any): void;
    static(filePath: any): void;
    downloadIo(bytes: any, fileName: any, headers?: {}, type?: string): void;
    text(string: any, type?: string): void;
    view(filename: any, data?: {}): void;
    pugView(filename: any, data?: {}): void;
    artView(filename: any, data?: {}): void;
    html(string: any, type?: string): void;
    xml(string: any, type?: string): void;
    /**
     *
     * @param {any} bytes
     * @abstract
     */
    writeBytes(bytes: any): void;
    /**
     *
     * @param {string} string
     * @abstract
     */
    writeText(string: string): void;
    /**
     *
     * @param {any} buffers
     * @abstract
     */
    writeBuffer(buffers: any): void;
    /**
     *
     * @param {any} stream
     * @abstract
     */
    writeStream(stream: any): void;
    setResponseType(type: any): void;
}

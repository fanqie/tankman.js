export = HttpResponseWrite;
/**
 * @abstract
 */
declare class HttpResponseWrite {
    _response: any;
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
    RenderTemplate(path: any, data: any): void;
    JsonFree(json: any): void;
    Json(data: any, errMsg: any, errNo: any): void;
    JsonSuccess(data: any, errMsg?: string): void;
    JsonError(data: any, errMsg: any, errNo?: number): void;
    Download(filePath: any, fileName: any, headers: any): void;
    WriteStatic(filePath: any): void;
    DownloadIo(bytes: any, fileName: any, headers?: {}, type?: string): void;
    Text(string: any, type?: string): void;
    Html(string: any, type?: string): void;
    Xml(string: any, type?: string): void;
    /**
     *
     * @param bytes
     * @abstract
     */
    WriteBytes(bytes: any): void;
    /**
     *
     * @param string
     * @abstract
     */
    WriteText(string: any): void;
    /**
     *
     * @param buffers
     * @abstract
     */
    WriteBuffer(buffers: any): void;
    /**
     *
     * @param stream
     * @abstract
     */
    WriteStream(stream: any): void;
    SetResponseType(type: any): void;
}

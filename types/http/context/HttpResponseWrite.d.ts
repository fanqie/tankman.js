export = HttpResponseWrite;
/**
 * @abstract
 */
declare class HttpResponseWrite {
    constructor(ctx: any, httpResponse: any);
    _response: any;
    _httpResponse: any;
    _config: {
        json: {
            httpStatus: string;
        };
    };
    RenderTemplate(path: any, data: any): void;
    Json(json: any): void;
    JsonSuccess(data: any): void;
    JsonError(data: any): void;
    Download(filePath: any, fileName: any, headers: any): void;
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
    SetResponseType(type: any): void;
}

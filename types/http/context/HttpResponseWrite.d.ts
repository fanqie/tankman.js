export = HttpResponseWrite;
declare class HttpResponseWrite {
    constructor(ctx: any, httpResponse: any);
    _response: any;
    _httpResponse: any;
    Render(path: any, data: any): void;
    Json(json: any): void;
    JsonSuccess(data: any): void;
    Download(filePath: any, fileName: any, headers: any): void;
    DownloadIo(bytes: any, fileName: any, headers: any): void;
    Text(string: any): void;
    Html(string: any): void;
    Xml(string: any): void;
    SetResponseType(type: any): void;
}

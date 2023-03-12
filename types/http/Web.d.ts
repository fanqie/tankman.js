export = Web;
declare class Web {
    constructor(options: any);
    uploadPath: string;
    staticFolder: any;
    Static(folder?: string): void;
    /**
     * @param httpCtx {HttpContext}
     * @return {boolean}
     */
    RenderStatic(httpCtx: HttpContext): boolean;
    Run(port: any, func: any, config: any): void;
    setBody(): void;
}

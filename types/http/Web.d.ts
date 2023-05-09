export = Web;
declare class Web {
    constructor(options: any);
    uploadPath: string;
    staticFolder: any;
    static(folder?: string): void;
    /**
     * @param  {HttpContext} httpCtx
     * @return {boolean}
     */
    renderStatic(httpCtx: HttpContext): boolean;
    run(port: any, func: any, config: any): void;
    printSuccess(port: any, max?: number): void;
    setBody(): void;
}

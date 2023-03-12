export = Web;
declare class Web {
    constructor(options: any);
    uploadPath: string;
    Run(port: any, func: any, config: any): void;
    setBody(): void;
}

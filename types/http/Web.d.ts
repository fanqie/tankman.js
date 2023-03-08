export = Web;
declare class Web extends Koa<Koa.DefaultState, Koa.DefaultContext> {
    constructor(options: any);
    uploadPath: string;
    Run(port: any, func: any, config: any): void;
    setBody(): void;
}
import Koa = require("koa");

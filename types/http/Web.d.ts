export = Web;
declare class Web extends Koa<Koa.DefaultState, Koa.DefaultContext> {
    constructor(options: any);
    tempPath: string;
    Run(port: any, func: any, config: any): void;
}
import Koa = require("koa");

export = Engine;
declare class Engine {
    constructor(app: any);
    HttpServer: any;
    /**
     *
     * @type {Application}
     */
    app: Application;
    port: number;
    accessPipeline: AccessPipeline;
    appKey: any[];
    Run(): void;
    /**
     *
     * @param httpCtx {HttpContext}
     * @param next
     * @return {Promise<void>}
     * @private
     */
    private _RouteHandle;
}
import Application = require("../boot/Application");
import AccessPipeline = require("./pipeline/AccessPipeline");

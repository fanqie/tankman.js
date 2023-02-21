export = Engine;
declare class Engine {
    constructor(app: any);
    HttpServer: any;
    app: any;
    port: number;
    accessPipeline: AccessPipeline;
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
import AccessPipeline = require("./pipeline/AccessPipeline");

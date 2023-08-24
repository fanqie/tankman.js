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
    run(): void;
    /**
     *
     * @param {HttpContext} httpCtx
     * @param {function} next
     * @return {Promise<void>}
     * @private
     */
    private _routeHandle;
}
import Application = require("../boot/Application");
import AccessPipeline = require("./pipeline/AccessPipeline");

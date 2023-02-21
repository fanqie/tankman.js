export = AccessPipeline;
declare class AccessPipeline {
    /**
     *
     * @type Object:string:Middleware
     */
    middlewareMaps: any;
    /**
     * Handle Next
     * @param httpCtx {HttpContext}
     * @param route {Router|RouterHandle}
     * @public
     */
    public HandleNext(httpCtx: HttpContext, route: Router | RouterHandle): Promise<void>;
}
import HttpContext = require("../context/HttpContext");
import Router = require("../../route/Router");
import RouterHandle = require("../../route/RouterHandle");

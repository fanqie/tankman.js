//@ts-nocheck
const Middleware = require("../middleware/Middleware");

const CtxPipeline = require("./CtxPipeline");

module.exports = class AccessPipeline {
    /**
     *
     * @type Object:string:Middleware
     */
    middlewareMaps = {};
    app
    constructor(app) {
        this.app=app
        const configMaps = this.app.Facades.Config.Get('app', {})['middleware'];
        Object.keys(configMaps).forEach(key => {
            this.middlewareMaps[key] = new configMaps[key]()
        })
    }

    /**
     * Handle Next
     * @param httpCtx {HttpContext}
     * @param route {Router|RouterHandle}
     * @public
     */
   async HandleNext(httpCtx, route) {
        const ctxPipeline= new CtxPipeline(httpCtx);


        const middlewareQueue = route.options.middleware;
        if (route.options.middleware.length > 0) {

            for (let i = 0; i < middlewareQueue.length; i++) {
                if (this.middlewareMaps.hasOwnProperty(middlewareQueue[i])) {
                    /**
                     * @type Middleware
                     */
                    const middleware=this.middlewareMaps[middlewareQueue[i]];
                    const handle=middleware.Handle;
                    // @ts-ignore
                    ctxPipeline.Pip(handle)
                }
            }
        }
        ctxPipeline.Pip(route.GetInstanceAction());
        await  ctxPipeline.Next()
    }

}

const FC = require("../../Facades")
const CtxPipeline = require("./CtxPipeline")


module.exports = class AccessPipeline {
    middlewareMaps = {}

    constructor() {
        const configMaps = FC.Config.Get('app', {})['middleware']
        Object.keys(configMaps).forEach(key => {
            this.middlewareMaps[key] = new configMaps[key]()
        })
    }

    /**
     * Handle Next
     * @param ctx
     * @param route
     * @public
     */
   async HandleNext(httpCtx, route) {
        const ctxPipeline= new CtxPipeline(httpCtx);

        /**
         *
         * @type {[]../Middleware/Middleware}
         */
        const middlewareQueue = route.options.middleware;
        if (route.options.middleware.length > 0) {

            for (let i = 0; i < middlewareQueue.length; i++) {
                if (this.middlewareMaps.hasOwnProperty(middlewareQueue[i])) {
                    ctxPipeline.Pip(this.middlewareMaps[middlewareQueue[i]].Handle)
                }
            }
        }
        ctxPipeline.Pip(route.GetInstanceAction());
        await ctxPipeline.Next()
    }

}

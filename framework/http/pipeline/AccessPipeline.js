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
     * @constructor
     */
   async HandleNext(ctx, route) {
        const ctxPipeline= new CtxPipeline(ctx);

        /**
         *
         * @type {[]../Middleware/Middleware}
         */
        const middlewareQueue = route.options.middlewares
        if (route.options.middlewares.length > 0) {

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

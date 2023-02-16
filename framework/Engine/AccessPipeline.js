const FC = require("../Facades")


module.exports = class AccessPipeline {
    middlewareMaps={}
    constructor(){
        const configMaps=FC.Config.Get('app', {})['middleware']
          Object.keys(configMaps).forEach(key=>{
              this.middlewareMaps[key]=new configMaps[key]()
         })
    }
    /**
     * Handle Next
     * @param ctx
     * @param route
     * @constructor
     */
    HandleNext(ctx,route){
        const it=this.NextIterator(ctx,route,(handle,ctx)=>{
            handle(ctx,it)
        });
        it.next()
    }
    /**
     * @param ctx
     * @param route {Router|RouterHandle}
     * @param callback {Function}
     * @returns {IterableIterator<*>}
     * @constructor
     */
   async * NextIterator(ctx, route,callback ) {
        /**
         *
         * @type {[]../Middleware/Middleware}
         */
        const middlewareQueue = route.options.middlewares
        if (route.options.middlewares.length > 0) {

            for (let i = 0; i < middlewareQueue.length; i++) {
                console.log(this.middlewareMaps,this.middlewareMaps.hasOwnProperty(middlewareQueue[i]))
                if (this.middlewareMaps.hasOwnProperty(middlewareQueue[i])) {

                    yield await callback(this.middlewareMaps[middlewareQueue[i]].Handle,ctx)
                }
            }
        }
        yield await  route.action(ctx)
    }
}
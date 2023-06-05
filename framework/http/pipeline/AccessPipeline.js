// @ts-nocheck
const Middleware = require('../middleware/Middleware');

const CtxPipeline = require('./CtxPipeline');
const SingletonFactory = require("../../factor/SingletonFactory");

module.exports = class AccessPipeline {
    /**
     *
     * @type Object:string:middleware
     */
    middlewareMaps = {};
    app;

    constructor(app) {
        this.app = app;
        const configMaps = this.app.facades.config.get('kernel', {})['middleware'];
        Object.keys(configMaps).forEach((key) => {
            this.middlewareMaps[key] = new configMaps[key]();
        });
    }

    /**
     * handle next
     * @param {HttpContext} httpCtx
     * @param {Router|RouterHandle} route
     * @public
     */
    async handleNext(httpCtx, route) {
        const ctxPipeline = new CtxPipeline(httpCtx);
        const globalMiddlewares = this.app.facades.config.get('app', {})?.globalMiddlewares;
        if (globalMiddlewares) {
            globalMiddlewares.forEach(middleware=>{
               ctxPipeline.pip(SingletonFactory.make(middleware).handle)

            })
        }
        const middlewareQueue = route.options.middleware;
        if (route.options.middleware.length > 0) {
            for (let i = 0; i < middlewareQueue.length; i++) {
                if (this.middlewareMaps.hasOwnProperty(middlewareQueue[i])) {
                    /**
                     * @type Middleware
                     */
                    const middleware = this.middlewareMaps[middlewareQueue[i]];
                    const handle = middleware.handle;
                    // @ts-ignore
                    ctxPipeline.pip(handle);
                }
            }
        }
        ctxPipeline.pip(route.getInstanceAction());
        await ctxPipeline.next();
    }
};

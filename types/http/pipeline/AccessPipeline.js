var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Router = require("../../route/Router");
const RouterHandle = require("../../route/RouterHandle");
const HttpContext = require("../context/HttpContext");
const Middleware = require("../middleware/Middleware");
const FC = require("../../Facades");
const CtxPipeline = require("./CtxPipeline");
module.exports = class AccessPipeline {
    constructor() {
        /**
         *
         * @type Object:string:Middleware
         */
        this.middlewareMaps = {};
        const configMaps = FC.Config.Get('app', {})['middleware'];
        Object.keys(configMaps).forEach(key => {
            this.middlewareMaps[key] = new configMaps[key]();
        });
    }
    /**
     * Handle Next
     * @param httpCtx {HttpContext}
     * @param route {Router|RouterHandle}
     * @public
     */
    HandleNext(httpCtx, route) {
        return __awaiter(this, void 0, void 0, function* () {
            const ctxPipeline = new CtxPipeline(httpCtx);
            const middlewareQueue = route.options.middleware;
            if (route.options.middleware.length > 0) {
                for (let i = 0; i < middlewareQueue.length; i++) {
                    if (this.middlewareMaps.hasOwnProperty(middlewareQueue[i])) {
                        /**
                         * @type Middleware
                         */
                        const middleware = this.middlewareMaps[middlewareQueue[i]];
                        const handle = middleware.Handle;
                        // @ts-ignore
                        ctxPipeline.Pip(handle);
                    }
                }
            }
            // @ts-ignore
            ctxPipeline.Pip(route.GetInstanceAction());
            // @ts-ignore
            yield new ctxPipeline.Next();
        });
    }
};

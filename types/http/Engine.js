var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const HttpContext = require("./context/HttpContext");
const Web = require("./Web");
const AccessPipeline = require("./pipeline/AccessPipeline");
const Facades = require("../facades/Facades");
const createError = require("http-errors");
const microtime = require('microtime');
module.exports = class Engine {
    constructor(app) {
        this.HttpServer = null;
        this.app = null;
        this.port = 8002;
        this.app = app;
        this.port = Facades.Env.Get("APP_PORT") || 8002;
        this.accessPipeline = new AccessPipeline();
    }
    Run() {
        this.HttpServer = new Web();
        this.HttpServer.Run(this.port, (pid) => {
            Facades.Log.Info(`run process：${pid}`);
        });
        this.HttpServer.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
            yield this._RouteHandle(new HttpContext(this.app, ctx), next);
        }));
    }
    /**
     *
     * @param httpCtx {HttpContext}
     * @param next
     * @return {Promise<void>}
     * @private
     */
    _RouteHandle(httpCtx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const route = Facades.Route.GetByPathname(httpCtx.request.GetPath(), httpCtx.request.GetMethod());
            // console.log(route,ctx.request.path,ctx.request.method)
            if (route) {
                if (typeof route !== "boolean" && route.redirectUrl) {
                    httpCtx.Redirect(route.redirectUrl);
                }
                else {
                    try {
                        const start = microtime.now();
                        // await route.action(ctx)
                        yield this.accessPipeline.HandleNext(httpCtx, route);
                        const ms = microtime.now() - start;
                        httpCtx.request.SetHeader('X-Response-Time', `${ms}ms`);
                        Facades.Log.InfoHttp(`【PID:${process.pid}】${httpCtx.request.GetMethod()} ${httpCtx.request.GetUrl()} time:${ms}ns`);
                    }
                    catch (err) {
                        Facades.Log.ErrorHttp(err.message);
                        console.error(err);
                    }
                }
            }
            else {
                const route = Facades.Route.GetRoute("404");
                route ? httpCtx.Redirect(route.path) : next(createError.NotFound());
            }
        });
    }
};

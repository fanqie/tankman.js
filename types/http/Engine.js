var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Web = require("./Web");
const AccessPipeline = require("./pipeline/AccessPipeline");
const FC = require("../Facades");
const createError = require("http-errors");
const microtime = require('microtime');
module.exports = class Engine {
    constructor(app) {
        this.HttpServer = null;
        this.app = null;
        this.port = 8002;
        this.app = app;
        this.port = FC.Env.Get("APP_PORT") || 8002;
        this.accessPipeline = new AccessPipeline();
    }
    Run() {
        this.HttpServer = new Web();
        this.HttpServer.Run(this.port, (pid) => {
            FC.Log.Info(`run process：${pid}`);
        });
        this.HttpServer.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
            yield this._RouteHandle(ctx, next);
        }));
    }
    /**
     *
     * @param ctx
     * @param next
     * @return {Promise<void>}
     * @private
     */
    _RouteHandle(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const route = FC.Route.GetByPathname(ctx.request.path, ctx.request.method);
            if (route) {
                if (typeof route !== "boolean" && route.redirectUrl) {
                    ctx.redirect(route.redirectUrl);
                }
                else {
                    try {
                        const start = microtime.now();
                        yield this.accessPipeline.HandleNext(ctx, route);
                        const ms = microtime.now() - start;
                        ctx.set('X-Response-Time', `${ms}ms`);
                        FC.Log.InfoHttp(`【PID:${process.pid}】${ctx.request.method} ${ctx.request.url} time:${ms}ns`);
                    }
                    catch (err) {
                        FC.Log.ErrorHttp(err.message);
                        console.error(err);
                    }
                }
            }
            else {
                const route = FC.Route.GetRoute("404");
                route ? ctx.redirect(route.path) : next(createError.NotFound());
            }
        });
    }
};

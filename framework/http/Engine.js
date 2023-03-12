const HttpContext = require("./context/HttpContext");

const Web = require("./Web");
const AccessPipeline = require("./pipeline/AccessPipeline");
const createError = require("http-errors");
const microtime = require('microtime');
const Application = require("../boot/Application");

module.exports = class Engine {

    HttpServer = null;
    /**
     *
     * @type {Application}
     */
    app = null
    port = 8002
    accessPipeline
    appKey = []

    constructor(app) {
        this.app = app
        this.appKey = (this.app.Facades.Env.Get("APP_KEY") || "").trim()
        if (!this.appKey) {
            this.app.Facades.Log.Error(" \n please use the command to generate：$tankMan generate:key")
            throw new Error("The APP_KEY is missing")
        }
        this.port = this.app.Facades.Env.Get("APP_PORT") || 8002
        this.accessPipeline = new AccessPipeline(this.app)
    }

    Run() {
        this.HttpServer = new Web();
        this.HttpServer.keys = [this.appKey]

        this.HttpServer.Run(this.port, (pid) => {
            this.app.Facades.Log.Info(`run process：${pid}`)
        }, {
            ...this.app.Facades.Config.Get("cluster", {
                enabled: true,
                process_max_count: 128
            })
        });
        this.HttpServer.use(async (ctx, next) => {
            await this._RouteHandle(new HttpContext(this.app, ctx), next)
        });
    }

    /**
     *
     * @param httpCtx {HttpContext}
     * @param next
     * @return {Promise<void>}
     * @private
     */
    async _RouteHandle(httpCtx, next) {
        const route = this.app.Facades.Route.GetByPathname(httpCtx.request.GetPath(), httpCtx.request.GetMethod());
        // console.log(route,ctx.request.path,ctx.request.method)
        if (route) {
            httpCtx.SetRouter(route);
            if (typeof route !== "boolean" && route.redirectUrl) {

                httpCtx.Redirect(route.redirectUrl)
            } else {
                try {
                    const start = microtime.now();
                    await this.accessPipeline.HandleNext(httpCtx, route);

                    const ms = microtime.now() - start;
                    httpCtx.request.SetHeader('X-Response-Time', `${ms}ms`);
                    this.app.Facades.Log.InfoHttp(`【PID:${process.pid}】${httpCtx.request.GetMethod()} ${httpCtx.request.GetUrl()} time:${ms}ns`)

                } catch (err) {
                    this.app.Facades.Log.ErrorHttp(err.message);
                    console.error(err)
                }

            }

        } else {
            const route = this.app.Facades.Route.GetRoute("404")
            route ? httpCtx.Redirect(route.path) : next(createError.NotFound());
        }
    }
}

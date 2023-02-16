const Web = require("./Web")
const FC = require("../Facades")
const createError = require("http-errors")
const microtime = require('microtime')
const cluster = require('cluster');
const os = require('os');


const http = require('http');
module.exports = class Engine {

    HttpServer = null;
    app = null
    port = 8002


    constructor(app) {
        this.app = app
        this.port = FC.Env.Get("APP_PORT") || 8002
    }

    Run() {
        this.HttpServer = new Web()
        this.HttpServer.Run(this.port, (pid) => {
           FC.Log.Info(`run process：${pid}`)
        })
        this.HttpServer.use(async (ctx, next) => {
            await this._RouteHandle(ctx, next)
        });
    }


    /**
     *
     * @param ctx
     * @param next
     * @return {Promise<void>}
     * @private
     */
    async _RouteHandle(ctx, next) {
        const route = FC.Route.GetByPathname(ctx.request.path, ctx.request.method)
        // console.log(route,ctx.request.path,ctx.request.method)
        if (route) {
            if (route.redirectUrl) {

                ctx.redirect(route.redirectUrl)
            } else {
                try {
                    const start = microtime.now();
                    await route.action(ctx)
                    const ms = microtime.now() - start;
                    ctx.set('X-Response-Time', `${ms}ms`);
                    FC.Log.InfoHttp(`【PID:${process.pid}】${ctx.request.method} ${ctx.request.url} time:${ms}ns`)
                } catch (err) {
                    FC.Log.ErrorHttp(err.message)
                    console.error(err)
                }

            }

        } else {
            const route = FC.Route.GetRoute("404")
            route ? ctx.redirect(route.path) : next(createError.NotFound());
        }
    }
}

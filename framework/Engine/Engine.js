const Web = require("../Web")
const FC = require("../Facades")
const createError = require("http-errors")
const microtime = require('microtime')
module.exports = class Engine {

    HttpServer = null;
    app = null

    constructor(app) {
        this.app = app
    }

    Run() {
        this.HttpServer = new Web()

        const port = FC.Env.Get("APP_PORT")
        this.HttpServer.listen(port || 8002)
        this._RunHandle()
        FC.Log.InfoHttp(`server run in port=${port}`)
        FC.Log.InfoHttp(`web url=http://127.0.0.1:${port}`)
        FC.Log.InfoHttp(`service start success`)
        this.HttpServer.on('error', err => {
            FC.Log.ErrorHttp(`server error: ${err.message}`)
            console.error(err)
        });
    }

    _RunHandle() {
        this.HttpServer.use(async (ctx, next) => {

            //await next();
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
        if (route) {
            if (route.redirectUrl) {

                ctx.redirect(route.redirectUrl)
            } else {
                try {
                    const start = microtime.now();
                    await route.action(ctx)
                    const ms = microtime.now() - start;
                    ctx.set('X-Response-Time', `${ms}ms`);
                    FC.Log.InfoHttp(`${ctx.request.method} ${ctx.request.url} time:${ms}ns`)
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

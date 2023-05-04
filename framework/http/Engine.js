const HttpContext = require('./context/HttpContext');

const Web = require('./Web');
const AccessPipeline = require('./pipeline/AccessPipeline');
const createError = require('http-errors');
const microtime = require('microtime');
const Application = require('../boot/Application');

module.exports = class Engine {
    HttpServer = null;
    /**
     *
     * @type {Application}
     */
    app = null;
    port = 8002;
    accessPipeline;
    appKey = [];

    constructor(app) {
        this.app = app;
        this.appKey = (this.app.facades.env.get('APP_KEY') || '').trim();
        if (!this.appKey) {
            this.app.facades.env.error(' \n please use the command to generate：$tankMan generate:key');
            throw new Error('The APP_KEY is missing');
        }
        this.port = this.app.facades.env.get('APP_PORT') || 8002;
        this.accessPipeline = new AccessPipeline(this.app);
    }

    run() {
        this.HttpServer = new Web();
        this.HttpServer.keys = [this.appKey];
        this.HttpServer.static(this.app.facades.env.get('APP_WEBROOT_DIR', './public'));
        this.HttpServer.run(this.port, (pid) => {
            this.app.facades.log.info(`run process：${pid}`);
        }, {
            ...this.app.facades.config.get('cluster', {
                enabled: true,
                process_max_count: 128,
            }),
        });
        this.HttpServer.use(async (ctx, next) => {
            await this._routeHandle(new HttpContext(this.app, ctx), next);
        });
    }

    /**
     *
     * @param {HttpContext} httpCtx
     * @param {function} next
     * @return {Promise<void>}
     * @private
     */
    async _routeHandle(httpCtx, next) {
        if (this.HttpServer.renderStatic(httpCtx)) {
            return;
        }
        const route = this.app.facades.route.getByPathname(httpCtx.request.getPathName(), httpCtx.request.getMethod());
        if (route) {
            httpCtx.setRouter(route);
            if (typeof route !== 'boolean' && route.redirectUrl) {
                httpCtx.redirect(route.redirectUrl);
            } else {
                try {
                    const start = microtime.now();
                    await this.accessPipeline.handleNext(httpCtx, route);

                    const ms = microtime.now() - start;
                    httpCtx.request.setHeader('X-Response-Time', `${ms}ms`);
                    this.app.facades.log.infoHttp(`【PID:${process.pid}】${httpCtx.request.getMethod()} ${httpCtx.request.getUrl()} time:${ms}ns`);
                } catch (err) {
                    this.app.facades.log.errorHttp(err.message);
                    console.error(err);
                }
            }
        } else {
            next(createError.NotFound());
            // const route = this.app.facades.route.getRoute('404');
            // // eslint-disable-next-line new-cap
            // route ? httpCtx.redirect(route.path) : next(createError.NotFound());
        }
    }
};

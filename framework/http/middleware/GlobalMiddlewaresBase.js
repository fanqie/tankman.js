const Middleware = require('./Middleware');
const Facades = require("../../facades/Facades");
const HttpContext = require('../context/HttpContext');
module.exports = class GlobalMiddlewaresBase extends Middleware {
    /**
     * @type {{regexp: RegExp, allowHeaders: string, except:(string|RegExp)[]}}
     */
    options = {
        regexp: /[\s\S]*/,// default allow all
        except: [],// default allow all
        allowHeaders: "X-Requested-With,Content-Type,Authorization,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken",
    }

    constructor(options = {}) {
        super();
        this.options = Object.assign(this.options, options);
    }

    /**
     *
     * @param httpCtx {HttpContext}
     * @param next
     * @returns {Promise<void|null>}
     * @function
     */
    async handle(httpCtx, next) {


        const routePath = httpCtx.getRouter().path;
        if (!this.options.regexp.test(routePath)) {
            await next();
            return null;
        }
        const except = this.options.except;
        if (except.some(pattern => pattern instanceof RegExp ? pattern.test(routePath) : pattern === routePath)) {
            await next();
            return null;
        }


    }

};

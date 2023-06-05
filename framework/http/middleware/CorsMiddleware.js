const GlobalMiddlewaresBase = require('./GlobalMiddlewaresBase');
const Facades = require("../../facades/Facades");
const HttpContext = require('../context/HttpContext');
module.exports = class CorsMiddleware extends GlobalMiddlewaresBase {
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
     * @returns {Promise<void>}
     * @function
     */
    async handle(httpCtx, next) {
        await super.handle(httpCtx, next);

        const origin = httpCtx.request.getHeader('origin');
        if (origin) {
            httpCtx.response.setHeader('Access-Control-Allow-Origin', origin);
            httpCtx.response.setHeader('Access-Control-Allow-Headers', this.options.allowHeaders);
            httpCtx.response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE , PATCH');
            httpCtx.response.setHeader('Access-Control-Allow-Credentials', 'true');
            httpCtx.response.setHeader('Access-Control-Expose-Headers', 'Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Authorization');
        }
        if (httpCtx.request.getMethod() === 'OPTIONS') {
            httpCtx.response.abortWithCode(204, '');
            return;
        }

        await next();

    }

};

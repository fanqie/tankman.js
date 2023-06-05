const Middleware = require('./Middleware');
const Facades = require("../../facades/Facades");
const HttpContext = require('../context/HttpContext');
module.exports = class ThrottleMiddleware extends Middleware {


    async handle(httpCtx, next) {
        await next();
    }
};

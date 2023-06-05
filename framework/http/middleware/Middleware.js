const HttpContext = require('../context/HttpContext');

/**
 * @abstract
 */
class Middleware {
    constructor() {
    }

    /**
     *
     * @param {HttpContext} httpCtx
     * @param {function} next
     * @return {Promise<void>}
     * @public
     * @abstract
     */
    async handle(httpCtx, next) {
        // before something
        await next();
        // after something
    }
}
module.exports = Middleware;

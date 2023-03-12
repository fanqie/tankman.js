const HttpContext = require("../context/HttpContext");

/**
 * @abstract
 */
class Middleware {
    /**
     *
     * @param httpCtx {HttpContext}
     * @param next
     * @returns {Promise<void>}
     * @public
     * @abstract
     */
    async Handle(httpCtx, next) {
        //before something
        await next();
        //after something

    }
};
module.exports = Middleware

const HttpContext = require("../context/HttpContext");

module.exports=class Middleware{
    /**
     *
     * @param httpCtx {HttpContext}
     * @param next
     * @returns {Promise<void>}
     * @public
     */
    async Handle(httpCtx, next) {
        //before something
        await next();
        //after something

    }
};

module.exports = class Middleware {
    /**
     *
     * @param ctx
     * @param itNext
     * @constructor
     */
    static Handle(ctx, itNext) {
        // before handle
        itNext.next();
        // after handle
    }
};

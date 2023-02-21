export = Middleware;
declare class Middleware {
    /**
     *
     * @param ctx
     * @param itNext
     * @constructor
     */
    static Handle(ctx: any, itNext: any): void;
}

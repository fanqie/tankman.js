export = AccessPipeline;
declare class AccessPipeline {
    /**
     *
     * @type Object:string:Middleware
     */
    middlewareMaps: any;
    /**
     * Handle Next
     * @param httpCtx {HttpContext}
     * @param route {Router|RouterHandle}
     * @public
     */
    public HandleNext(httpCtx: HttpContext, route: Router | RouterHandle): Promise<void>;
}

export = AccessPipeline;
declare class AccessPipeline {
    constructor(app: any);
    /**
     *
     * @type Object:string:Middleware
     */
    middlewareMaps: any;
    app: any;
    /**
     * Handle Next
     * @param httpCtx {HttpContext}
     * @param route {Router|RouterHandle}
     * @public
     */
    public HandleNext(httpCtx: HttpContext, route: Router | RouterHandle): Promise<void>;
}

export = AccessPipeline;
declare class AccessPipeline {
    constructor(app: any);
    /**
     *
     * @type Object:string:middleware
     */
    middlewareMaps: any;
    app: any;
    /**
     * handle next
     * @param {HttpContext} httpCtx
     * @param {Router|RouterHandle} route
     * @public
     */
    public handleNext(httpCtx: HttpContext, route: Router | RouterHandle): Promise<void>;
}

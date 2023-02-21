export = AccessPipeline;
declare class AccessPipeline {
    middlewareMaps: {};
    /**
     * Handle Next
     * @param ctx
     * @param route
     * @public
     */
    public HandleNext(ctx: any, route: any): Promise<void>;
}

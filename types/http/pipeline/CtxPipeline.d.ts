export = CtxPipeline;
declare class CtxPipeline {
    /**
     * @param {HttpContext} httpCtx
     */
    constructor(httpCtx: HttpContext);
    handles: any[];
    _httpCtx: any;
    /**
     *
     * @param {Promise<CtxPipeline>} handle
     * @return {CtxPipeline}
     * @function
     */
    pip(handle: Promise<CtxPipeline>): CtxPipeline;
    /**
     *
     * @return {Promise<CtxPipeline|boolean>}
     * @function
     */
    next(): Promise<CtxPipeline | boolean>;
}

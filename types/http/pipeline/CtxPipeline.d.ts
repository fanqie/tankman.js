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
     * @param {Function} handle
     * @return {CtxPipeline}
     * @function
     */
    pip(handle: Function): CtxPipeline;
    /**
     *
     * @return {Promise<CtxPipeline|boolean>}
     * @function
     */
    next(): Promise<CtxPipeline | boolean>;
}

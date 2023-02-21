export = CtxPipeline;
declare class CtxPipeline {
    /**
     * @param httpCtx {HttpContext}
     */
    constructor(httpCtx: HttpContext);
    handles: any[];
    _httpCtx: any;
    /**
     *
     * @param handle {Promise<CtxPipeline>}
     * @returns {CtxPipeline}
     * @constructor
     */
    Pip(handle: Promise<CtxPipeline>): CtxPipeline;
    /**
     *
     * @returns {Promise<CtxPipeline|boolean>}
     * @constructor
     */
    Next(): Promise<CtxPipeline | boolean>;
}

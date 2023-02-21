export = CtxPipeline;
declare class CtxPipeline {
    constructor(ctx: any);
    handles: any[];
    ctx: any;
    Pip(Func: any): import("./CtxPipeline");
    Next(): Promise<false | import("./CtxPipeline")>;
}

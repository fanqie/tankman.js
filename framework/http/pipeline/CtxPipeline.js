const HttpContext = require("../context/HttpContext");


module.exports=class CtxPipeline {
    handles=[];
    _httpCtx=null;

    /**
     * @param httpCtx {HttpContext}
     */
    constructor(httpCtx){
        this._httpCtx=httpCtx
    }

    /**
     *
     * @param handle {Promise<CtxPipeline>}
     * @returns {CtxPipeline}
     * @constructor
     */
    Pip(handle) {
        this.handles.push(handle);
        return this
    }

    /**
     *
     * @returns {Promise<CtxPipeline|boolean>}
     * @constructor
     */
    async Next() {
        const next=this.handles.shift();
        if(next){
          await  next(this._httpCtx,()=>{this.Next.apply(this)});
            return false
        }
        return this
    }
};
module.exports=class CtxPipeline {
    handles=[];
    _httpCtx=null;

    /**
     * @param httpCtx {HttpContext}
     */
    constructor(httpCtx){
        this._httpCtx=httpCtx
    }
    Pip(Func) {
        this.handles.push(Func);
        return this
    }
    async Next() {
        const next=this.handles.shift();
        if(next){
          await  next(this._httpCtx,()=>{this.Next.apply(this)});
            return false
        }
        return this
    }
}
module.exports=class CtxPipeline {
    handles=[];
    ctx=null
    constructor(ctx){
        this.ctx=ctx
    }
    Pip(Func) {
        this.handles.push(Func);
        return this
    }
    async Next() {
        const next=this.handles.shift();
        if(next){
          await  next(this.ctx,()=>{this.Next.apply(this)});
            return false
        }
        return this
    }
}
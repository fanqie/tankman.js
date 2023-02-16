module.exports=class Middleware{
    /**
     *  auto handle
     * @param ctx
     * @param next
     * @constructor
     */
   static Handle(ctx,itNext){
        // before handle
        itNext.next()
        // after handle
    }
}
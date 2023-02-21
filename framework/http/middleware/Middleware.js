module.exports=class Middleware{
    /**
     *  auto handle
     * @param ctx
     * @param next
     * @public
     */
   static Handle(ctx,itNext){
        // before handle
        itNext.next()
        // after handle
    }
}

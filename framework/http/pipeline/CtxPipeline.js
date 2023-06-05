// @ts-nocheck
module.exports = class CtxPipeline {
    handles = [];
    _httpCtx = null;

    /**
     * @param {HttpContext} httpCtx
     */
    constructor(httpCtx) {
        this._httpCtx = httpCtx;
    }

    /**
     *
     * @param {Function} handle
     * @return {CtxPipeline}
     * @function
     */
    pip(handle) {
        this.handles.push(handle);
        return this;
    }

    /**
     *
     * @return {Promise<CtxPipeline|boolean>}
     * @function
     */
    async next() {
        const next = this.handles.shift();
        if (next) {
            if (this.handles.length > 0) {
                await next(this._httpCtx, () => {
                    this.next.apply(this);
                });
            } else {
                await next(this._httpCtx);
            }

            return false;
        }
        return this;
    }
};

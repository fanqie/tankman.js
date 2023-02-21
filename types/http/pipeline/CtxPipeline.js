var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const HttpContext = require("../context/HttpContext");
module.exports = class CtxPipeline {
    /**
     * @param httpCtx {HttpContext}
     */
    constructor(httpCtx) {
        this.handles = [];
        this._httpCtx = null;
        this._httpCtx = httpCtx;
    }
    /**
     *
     * @param handle {Promise<CtxPipeline>}
     * @returns {CtxPipeline}
     * @constructor
     */
    Pip(handle) {
        this.handles.push(handle);
        return this;
    }
    /**
     *
     * @returns {Promise<CtxPipeline|boolean>}
     * @constructor
     */
    Next() {
        return __awaiter(this, void 0, void 0, function* () {
            const next = this.handles.shift();
            if (next) {
                yield next(this._httpCtx, () => { this.Next.apply(this); });
                return false;
            }
            return this;
        });
    }
};

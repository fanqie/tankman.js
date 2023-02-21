//@ts-nocheck
const Router = require("./Router");

class RouterHandle extends Router {
    /**
     * @param options {{middleware: *[], prefix: string}}
     * @param methods {string|string[]}
     * @param vPath {string}
     * @param controllerClassOrActionFunc {ClassDecorator|Function}
     * @param action {string}
     * @param action
     */
    constructor(options = {
        middleware: [],
        prefix: ""
    }, methods, vPath, controllerClassOrActionFunc, action) {
        super(options, methods, vPath, controllerClassOrActionFunc, action);
        super.methods = Array.isArray(methods) ? methods : [methods];
        super.vPath = vPath;
        super.path = super.MakePath();
        if (this._IsClass(controllerClassOrActionFunc)) {
            super.controllerClass = controllerClassOrActionFunc;
            super.action = action;
        } else {
            super.actionFunc = controllerClassOrActionFunc
        }

        // @ts-ignore
        super.match = super.MakeMath()

    }

    _IsClass(val) {
        return /^class\s/.test(Function.prototype.toString.call(val))   //false

    }

    /**
     * get url values
     * @param path
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    is(path, method) {
        path = path.toLowerCase();
        method = method.toLowerCase();
        if (this.methods.includes(method)) {
            return super.Parse(path)
        }
    }

    /**
     * middleware
     * @param middleware {string[]|string}
     * @public
     * @returns {Router|RouterHandle}
     */
    Middleware(middleware) {
        if (typeof middleware == "string") {
            middleware = [middleware]
        }
        this.options.middleware = [...this.options.middleware, ...middleware];
        return this
    }

    /**
     * Get Any route action
     * @return {Promise<CtxPipeline|boolean>}
     * @constructor
     */
    GetInstanceAction() {
        // @ts-ignore
        return this.controllerClass ? new this.controllerClass().__proto__[this.action] : this.actionFunc
    }


}

module.exports = RouterHandle;

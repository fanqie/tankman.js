const Router = require("./Router")

class RouterHandle extends Router {
    /**
     * @param options {{middleware: *[], prefix: string}}
     * @param methods {string|[string]}
     * @param vPath {string}
     * @param controllerClassOrActionFunc {Class|Function}
     * @param action {string}
     * @param action
     */
    constructor(options = {}, methods, vPath, controllerClassOrActionFunc, action) {
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

        super.match = super.MakeMath()

    }

    _IsClass(val) {
        return /^class\s/.test(Function.prototype.toString.call(val))   //false

    }

    /**
     * get url values
     * @param path
     * @param method
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
     * @param middleware
     * @returns {Router|RouterHandle}
     * @constructor
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
     * @returns {Function}
     * @constructor
     */
    GetInstanceAction() {
        return this.controllerClass ? new this.controllerClass().__proto__[this.action] : this.actionFunc
    }


}

module.exports = RouterHandle;

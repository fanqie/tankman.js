const path = require("path")
const pathToRegexp = require("path-to-regexp")
const Router = require("./Router")
const {FC} = require("../Index");

class RouterHandle extends Router {
    /**
     * @param options {{middlewares: *[], prefix: string}}
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
     * @param middlewares {[string]|string}
     * @public
     */
    Middleware(middlewares) {
        if (typeof middlewares == "string") {
            middlewares = [middlewares]
        }
        this.options.middlewares = [...this.options.middlewares, ...middlewares]
        return this
    }

    /**
     * Get Any route action
     * @returns {Function}
     * @public
     */
    GetInstanceAction() {
        return this.controllerClass ? new this.controllerClass().__proto__[this.action] : this.actionFunc
    }


}

module.exports = RouterHandle

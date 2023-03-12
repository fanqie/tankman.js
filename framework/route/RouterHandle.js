//@ts-nocheck
const Router = require("./Router");
const Controller = require("../http/controller/Controller")
const {instanceLookup} = require("tedious/lib/instance-lookup");

class RouterHandle extends Router {
    /**
     * @param options {{middleware: *[], prefix: string}}
     * @param methods {string|string[]}
     * @param vPath {string}
     * @param controllerOrActionFunc {Controller|Function}
     * @param action {string}
     * @param action
     */
    constructor(options = {
        middleware: [],
        prefix: ""
    }, methods, vPath, controllerOrActionFunc, action) {
        super(options, methods, vPath, controllerOrActionFunc, action);
        super.methods = Array.isArray(methods) ? methods : [methods];
        super.vPath = vPath;
        super.path = super.MakePath();
        if (this._IsClass(controllerOrActionFunc)) {
            super.controllerClass = controllerOrActionFunc;
            super.action = action;
        } else {
            super.actionFunc = controllerOrActionFunc
        }

        // @ts-ignore
        super.match = super.MakeMath()

    }

    _IsClass(val) {
        return /^class\s/.test(val.constructor.toString())   //false

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
     * @return {function(*): *}
     * @function
     */
    GetInstanceAction() {
        // @ts-ignore
        const instance = this.controllerClass;
        return (httpContext) => {

            return instance ?instance.__proto__[this.action].call(instance, httpContext, Object.values(httpContext.params))
                : this.actionFunc(httpContext, Object.values(httpContext.params))
        }
    }


}

module.exports = RouterHandle;

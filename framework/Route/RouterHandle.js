const path = require("path")
const pathToRegexp = require("path-to-regexp")
const Router = require("./Router")

class RouterHandle extends Router {
    /**
     *
     * @param methods {string|[string]}
     * @param path
     * @param options {{middlewares: *[], prefix: string}}
     * @param action
     */
    constructor(options = {}, methods, vPath, action) {
        super(options, methods, vPath, action);
        super.methods = Array.isArray(methods)?methods:[methods]
        super.vPath = vPath
        super.path = super.MakePath()
        super.action = action
        super.match = super.MakeMath()
    }

    /**
     * get url values
     * @param path
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    is(path, method) {
        path = path.toLowerCase()
        method = method.toLowerCase()
        if (this.methods.includes(method)) {
            return super.Parse(path)
        }
    }

    /**
     * Middleware
     * @param middlewares {[string]|string}
     * @constructor
     */
    Middleware(middlewares) {
        if (typeof middlewares == "string") {
            middlewares = [middlewares]
        }
        this.options.middlewares = [...this.options.middlewares, ...middlewares]
        return this
    }


}

module.exports = RouterHandle

const RouterHandle = require("./RouterHandle")
const {REQUEST_METHOD} = require("./Enums")
const Group = require("./Group")
const Redirect = require("./Redirect");

/**
 *
 */
class Route {
    /**
     * @type  string
     * @private
     */
    _prefix = ""
    _group_middlewares = []
    /**
     *
     * @type {{prefix: string, middleware: [string]}}
     */
    options = {
        prefix: "",
        middleware: []
    }

    /**
     *
     * @param options
     */
    constructor(options) {
        this.options = {...options}
    }

    /**
     *
     * @type {[Router]}
     * @private
     */
    _routers = []

    All() {
        return this._routers
    }

    /**
     *
     * @param prefix
     * @return {Route}
     * @constructor
     */
    Prefix(prefix) {
        this._prefix = prefix
        return this
    }


    /**
     *
     * @param prefix {string}
     * @param func {Function}
     * @param groupMiddlewares {[string]}
     * @return {Route}
     * @constructor
     */
    Group(prefix, func, groupMiddlewares) {
        this._prefix = prefix
        this._group_middlewares = groupMiddlewares || []
        func.apply(this)
        return this
    }

    /**
     * @param path
     * @return {string}
     * @constructor
     */
    GetPath(path) {
        return this.options.prefix ? this.options.prefix + "/" : "" + path
    }


    /**
     * @param method
     * @param path
     * @param action
     * @return {Router}
     * @private
     */
    _CreateRouterHandle(method, path, action) {
        const handle = new RouterHandle({
            prefix: this._prefix,
            middlewares: [...this._group_middlewares]
        }, method, path, action)

        this._routers.push(handle)
        return handle;
    }

    /**
     * @param path
     * @param action
     * @return {Router}
     */
    Post(path, action) {

        return this._CreateRouterHandle(REQUEST_METHOD.POST, path, action)
    }

    /**
     * @param path
     * @param action
     * @return {Router|RouterHandle}
     */
    Get(path, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.GET, path, action)
    }


    /**
     * @param path
     * @param action
     * @return {Router|RouterHandle}
     */
    Patch(path, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.PATCH, path, action)
    }

    /**
     * @param path
     * @param action
     * @return {Router|RouterHandle}
     */
    Put(path, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.PUT, path, action)
    }

    /**
     * @param path
     * @param action
     * @return {Router|RouterHandle}
     */
    Any(path, action) {
        return this._CreateRouterHandle(Object.values(REQUEST_METHOD), path, action)
    }

    /**
     * @param path
     * @param action
     * @return {Router|RouterHandle}
     */
    Delete(path, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.DELETE, path, action)
    }

    /**
     * @param methodsArray {[string]}
     * @param path
     * @param action
     * @return {Router|RouterHandle}
     */
    Match(methodsArray, path, action) {
        if (!Array.isArray(methodsArray)) {
            throw new Error("methodsArray must array")
        }
        const methods = methodsArray.filter(method => Object.values(REQUEST_METHOD).includes(method))
        if (methods.length > 0) {
            return this._CreateRouterHandle(methods, path, action)
        }
        throw new Error("methodsArray must values [post|put|get|delete|put]")
    }

    /**
     * @param path
     * @param redirectUrl
     * @param status
     * @return {Router|RouterHandle}
     */
    Redirect(path, redirectUrl) {
        const handle = new Redirect({
            prefix: this._prefix,
            middlewares: [...this._group_middlewares]
        }, path, redirectUrl)
        this._routers.push(handle)
        return handle
    }

    /**
     *
     * @type {Map<string,Router|RouterHandle>}
     * @private
     */
    _routesMap = new Map()

    LoadSet() {
        this._routesMap.clear()
        this._routers.forEach(route => {
            if (route.name) {
                this._routesMap.set(route.name, route)
            }
        })
    }

    /**
     * Get route by route name
     * @param name {string}
     * @return {Router | RouterHandle}
     * @constructor
     */
    GetRoute(name) {
        return this._routesMap.get(name)
    }

    /**
     * Get route by route pathname
     * @param pathname {string}
     * @param method {string} post|put|get|delete|put
     * @return {Router|RouterHandle|Redirect|boolean}
     * @constructor
     */
    GetByPathname(pathname, method) {
        method = method = method.toLowerCase()
        const route = this._routers.find(route => {
            return route.Is(pathname, method)
        })
        //todo:cache
        return route;
    }
}

module.exports = Route

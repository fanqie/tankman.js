const RouterHandle = require("./RouterHandle");
const {REQUEST_METHOD} = require("./Enums");
const Redirect = require("./Redirect");
const Router = require("./Router");
const Controller =require("../http/controller/Controller")
/**
 *
 */
class Route {
    /**
     * @type  string
     * @private
     */
    _prefix = "";
    _group_middleware = [];
    /**
     *
     * @type {{prefix: string, middleware: string[]}}
     */
    options = {
        prefix: "",
        middleware: []
    };

    /**
     *
     * @param options
     */
    constructor(options) {
        this.options = {...options}
    }

    /**
     *
     * @type {Router[]}
     * @private
     */
    _routers = [];

    All() {
        return this._routers
    }

    /**
     *
     * @param prefix
     * @param func:route {Function:route{Router|RouterHandel} }
     * @param groupMiddlewareItems
     * @returns {Route}
     * @constructor
     */
    Group(prefix, func=(route)=>{console.log(route)}, groupMiddlewareItems) {
        this._prefix = prefix;
        this._group_middleware = groupMiddlewareItems || [];
        func(this);
        return this;
    }

    /**
     * @param path
     * @return {string}
     * @public
     */
    GetPath(path) {
        return this.options.prefix ? this.options.prefix + "/" : "" + path
    }


    /**
     * @param method {string[]|string}
     * @param path {string}
     * @param controllerOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router}
     * @private
     */
    _CreateRouterHandle(method, path, controllerOrActionFunc, action) {

        const handle = new RouterHandle({
            prefix: this._prefix,
            middleware: [...this._group_middleware]
        }, method, path, controllerOrActionFunc, action);

        this._routers.push(handle);
        return handle;
    }

    /**
     * @param path {string}
     * @param controllerOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Post(path, controllerOrActionFunc, action) {

        return this._CreateRouterHandle(REQUEST_METHOD.POST, path, controllerOrActionFunc, action)
    }

    /**
     * @param path {string}
     * @param controllerOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Get(path, controllerOrActionFunc, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.GET, path, controllerOrActionFunc, action)
    }


    /**
     * @param path {string}
     * @param controllerOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Patch(path, controllerOrActionFunc, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.PATCH, path, controllerOrActionFunc, action)
    }

    /**
     * @param path {string}
     * @param controllerOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Put(path, controllerOrActionFunc, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.PUT, path, controllerOrActionFunc, action)
    }

    /**
     * @param path {string}
     * @param controllerOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Any(path, controllerOrActionFunc, action) {
        return this._CreateRouterHandle(Object.values(REQUEST_METHOD), path, controllerOrActionFunc, action)
    }

    /**
     * @param path {string}
     * @param controllerOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Delete(path, controllerOrActionFunc, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.DELETE, path, controllerOrActionFunc, action)
    }

    /**
     * @param methodsArray {string[]}
     * @param path {string}
     * @param controllerOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Match(methodsArray, path, controllerOrActionFunc, action) {
        if (!Array.isArray(methodsArray)) {
            throw new Error("methodsArray must array")
        }
        const methods = methodsArray.filter(method => Object.values(REQUEST_METHOD).includes(method))
        if (methods.length > 0) {
            return this._CreateRouterHandle(methods, path, controllerOrActionFunc, action)
        }
        throw new Error("methodsArray must values [post|put|get|delete|put]")
    }

    /**
     * @param path
     * @param redirectUrl
     * @return {Router|RouterHandle}
     */
    Redirect(path, redirectUrl) {
        const handle = new Redirect({
            prefix: this._prefix,
            middleware: [...this._group_middleware]
        }, path, redirectUrl);
        this._routers.push(handle)
        return handle
    }

    /**
     *
     * @type {Map<string,Router|RouterHandle>}
     * @private
     */
    _routesMap = new Map();

    LoadSet() {
        this._routesMap.clear();
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
     * @public
     */
    GetRoute(name) {
        return this._routesMap.get(name)
    }

    /**
     * Get route by route pathname
     * @param pathname {string}
     * @param method {string} post|put|get|delete|put
     * @return {Router|RouterHandle|Redirect}
     * @public
     */
    GetByPathname(pathname, method) {
        method = method = method.toLowerCase();
        const route = this._routers.find(route => {
            return route.Is(pathname, method)
        });
        //todo:cache
        return route;
    }
}

module.exports = Route;

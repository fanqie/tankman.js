const RouterHandle = require("./RouterHandle");
const { REQUEST_METHOD } = require("./Enums");
const Redirect = require("./Redirect");
const Router = require("./Router");
/**
 *
 */
class Route {
    /**
     *
     * @param options
     */
    constructor(options) {
        /**
         * @type  string
         * @private
         */
        this._prefix = "";
        this._group_middlewares = [];
        /**
         *
         * @type {{prefix: string, middleware: string[]}}
         */
        this.options = {
            prefix: "",
            middleware: []
        };
        /**
         *
         * @type {Router[]}
         * @private
         */
        this._routers = [];
        /**
         *
         * @type {Map<string,Router|RouterHandle>}
         * @private
         */
        this._routesMap = new Map();
        this.options = Object.assign({}, options);
    }
    All() {
        return this._routers;
    }
    /**
     *
     * @param prefix {string}
     * @param func {Function}
     * @param groupMiddlewares {[string]}
     * @return {Route}
     * @public
     */
    Group(prefix, func, groupMiddlewares) {
        this._prefix = prefix;
        this._group_middlewares = groupMiddlewares || [];
        func.apply(this);
        return this;
    }
    /**
     * @param path
     * @return {string}
     * @public
     */
    GetPath(path) {
        return this.options.prefix ? this.options.prefix + "/" : "" + path;
    }
    /**
     * @param method {string[]|string}
     * @param path {string}
     * @param controllerClassOrActionFunc {ClassDecorator|Function}
     * @param action {string?}
     * @return {Router}
     * @private
     */
    _CreateRouterHandle(method, path, controllerClassOrActionFunc, action) {
        const handle = new RouterHandle({
            prefix: this._prefix,
            middlewares: [...this._group_middlewares]
        }, method, path, controllerClassOrActionFunc, action);
        this._routers.push(handle);
        return handle;
    }
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {ClassDecorator|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Post(path, controllerClassOrActionFunc, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.POST, path, controllerClassOrActionFunc, action);
    }
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {ClassDecorator|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Get(path, controllerClassOrActionFunc, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.GET, path, controllerClassOrActionFunc, action);
    }
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {ClassDecorator|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Patch(path, controllerClassOrActionFunc, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.PATCH, path, controllerClassOrActionFunc, action);
    }
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {ClassDecorator|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Put(path, controllerClassOrActionFunc, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.PUT, path, controllerClassOrActionFunc, action);
    }
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {ClassDecorator|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Any(path, controllerClassOrActionFunc, action) {
        return this._CreateRouterHandle(Object.values(REQUEST_METHOD), path, controllerClassOrActionFunc, action);
    }
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {ClassDecorator|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Delete(path, controllerClassOrActionFunc, action) {
        return this._CreateRouterHandle(REQUEST_METHOD.DELETE, path, controllerClassOrActionFunc, action);
    }
    /**
     * @param methodsArray {string[]}
     * @param path {string}
     * @param controllerClassOrActionFunc {ClassDecorator|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Match(methodsArray, path, controllerClassOrActionFunc, action) {
        if (!Array.isArray(methodsArray)) {
            throw new Error("methodsArray must array");
        }
        const methods = methodsArray.filter(method => Object.values(REQUEST_METHOD).includes(method));
        if (methods.length > 0) {
            return this._CreateRouterHandle(methods, path, controllerClassOrActionFunc, action);
        }
        throw new Error("methodsArray must values [post|put|get|delete|put]");
    }
    /**
     * @param path
     * @param redirectUrl
     * @return {Router|RouterHandle}
     */
    Redirect(path, redirectUrl) {
        const handle = new Redirect({
            prefix: this._prefix,
            middlewares: [...this._group_middlewares]
        }, path, redirectUrl);
        this._routers.push(handle);
        return handle;
    }
    LoadSet() {
        this._routesMap.clear();
        this._routers.forEach(route => {
            if (route.name) {
                this._routesMap.set(route.name, route);
            }
        });
    }
    /**
     * Get route by route name
     * @param name {string}
     * @return {Router | RouterHandle}
     * @public
     */
    GetRoute(name) {
        return this._routesMap.get(name);
    }
    /**
     * Get route by route pathname
     * @param pathname {string}
     * @param method {string} post|put|get|delete|put
     * @return {Router|RouterHandle|Redirect|boolean}
     * @public
     */
    GetByPathname(pathname, method) {
        method = method = method.toLowerCase();
        const route = this._routers.find(route => {
            return route.Is(pathname, method);
        });
        //todo:cache
        return route;
    }
}
module.exports = Route;

const RouterHandle = require('./RouterHandle');
const {REQUEST_METHOD} = require('./Enums');
const Redirect = require('./Redirect');
const Router = require('./Router');
const Controller = require('../http/controller/Controller');

/**
 * Options object for configuring something.
 * @typedef {Object} options
 * @property {string} prefix - The prefix to use.
 * @property {string[]} middleware - An array of middleware to use.
 */

class Route {
    /**
     * @type  string
     * @private
     */
    _prefix = '';
    _group_middleware = [];
    /**
     * Options object for configuring something.
     * @typedef {Object} Options
     * @property {string} prefix - The prefix to use.
     * @property {string[]} middleware - An array of middleware to use.
     */
    options = {
        prefix: '',
        middleware: [],
    };

    /**
     * Constructs an instance of Route.
     * @param {Options} [options] - The options object.
     */
    constructor(options) {
        this.options = options || this.options;
    }

    /**
     *
     * @type {Router[]}
     * @private
     */
    _routers = [];

    /**
     *
     * @return {Router[]}
     * @constructor
     */
    all() {
        return this._routers;
    }

    /**
     *
     * @param {String} prefix
     * @param {Function} func:route
     * @param {[]} groupMiddlewareItems
     * @return {Route}
     * @constructor
     */
    group(prefix, func = (route) => {
    }, groupMiddlewareItems) {
        this._prefix = prefix;
        this._group_middleware = groupMiddlewareItems || [];
        func(this);
        return this;
    }

    /**
     * @param {String} path
     * @return {String}
     * @public
     */
    getPath(path) {
        return this.options.prefix ? this.options.prefix + '/' : '' + path;
    }


    /**
     * Creates a RouterHandle object and adds it to the list of routers.
     * @param {string[]|string} method - The HTTP method(s) to use.
     * @param {string} path - The path to use.
     * @param {[Controller,string]|Function|*} actionInfo - The action information for the router.
     * @returns {RouterHandle} - The newly created router handle.
     * @private
     */
    _createRouterHandle(method, path, actionInfo) {
        const handle = new RouterHandle({
            prefix: this._prefix,
            middleware: [...this._group_middleware],
        }, method, path, actionInfo);

        this._routers.push(handle);
        return handle;
    }

    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    post(path, actionInfo) {
        return this._createRouterHandle(REQUEST_METHOD.POST, path, actionInfo);
    }

    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    get(path, actionInfo) {
        return this._createRouterHandle(REQUEST_METHOD.GET, path, actionInfo);
    }


    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    patch(path, actionInfo) {
        return this._createRouterHandle(REQUEST_METHOD.PATCH, path, actionInfo);
    }

    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    put(path, actionInfo) {
        return this._createRouterHandle(REQUEST_METHOD.PUT, path, actionInfo);
    }

    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    any(path, actionInfo) {
        return this._createRouterHandle(Object.values(REQUEST_METHOD), path, actionInfo);
    }

    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    delete(path, actionInfo) {
        return this._createRouterHandle(REQUEST_METHOD.DELETE, path, actionInfo);
    }

    /**
     * @param {string[]} methodsArray
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    match(methodsArray, path, actionInfo) {
        if (!Array.isArray(methodsArray)) {
            throw new Error('methodsArray must array');
        }
        const methods = methodsArray.filter((method) => Object.values(REQUEST_METHOD).includes(method));
        if (methods.length > 0) {
            return this._createRouterHandle(methods, path, actionInfo);
        }
        throw new Error('methodsArray must values [post|put|get|delete|put]');
    }

    /**
     * @param {string} path
     * @param {string} redirectUrl
     * @return {Router|RouterHandle}
     */
    redirect(path, redirectUrl) {
        const handle = new Redirect({
            prefix: this._prefix,
            middleware: [...this._group_middleware],
        }, path, redirectUrl);
        this._routers.push(handle);
        return handle;
    }

    /**
     *
     * @type {Map<string,Router|RouterHandle>}
     * @private
     */
    _routesMap = new Map();

    /**
     * loadSet
     */
    loadSet() {
        this._routesMap.clear();
        this._routers.forEach((route) => {
            if (route.name) {
                this._routesMap.set(route.name, route);
            }
        });
    }

    /**
     * get route by route name
     * @param {string} name
     * @return {Router | RouterHandle}
     * @public
     */
    getRoute(name) {
        return this._routesMap.get(name);
    }

    /**
     * get route by route pathname
     * @param {string} pathname
     * @param {string} method 'post'|'put'|'get'|'delete'|'put'|'patch'
     * @return {Router|RouterHandle|Redirect}
     * @public
     */
    getByPathname(pathname, method) {
        method = method.toLowerCase();
        const route = this._routers.find((route) => {
            return route.is(pathname, method);
        });
        // todo:cache
        return route;
    }
}

module.exports = Route;

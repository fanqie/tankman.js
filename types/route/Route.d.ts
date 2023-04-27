export = Route;
/**
 * Options object for configuring something.
 * @typedef {Object} options
 * @property {string} prefix - The prefix to use.
 * @property {string[]} middleware - An array of middleware to use.
 */
declare class Route {
    /**
     * Constructs an instance of Route.
     * @param {Options} [options] - The options object.
     */
    constructor(options?: {
        /**
         * - The prefix to use.
         */
        prefix: string;
        /**
         * - An array of middleware to use.
         */
        middleware: string[];
    });
    /**
     * @type  string
     * @private
     */
    private _prefix;
    _group_middleware: any[];
    /**
     * Options object for configuring something.
     * @typedef {Object} Options
     * @property {string} prefix - The prefix to use.
     * @property {string[]} middleware - An array of middleware to use.
     */
    options: {
        prefix: string;
        middleware: any[];
    };
    /**
     *
     * @type {Router[]}
     * @private
     */
    private _routers;
    /**
     *
     * @return {Router[]}
     * @constructor
     */
    all(): Router[];
    /**
     *
     * @param {String} prefix
     * @param {Function} func:route
     * @param {[]} groupMiddlewareItems
     * @return {Route}
     * @constructor
     */
    group(prefix: string, func: Function, groupMiddlewareItems: []): Route;
    /**
     * @param {String} path
     * @return {String}
     * @public
     */
    public getPath(path: string): string;
    /**
     * Creates a RouterHandle object and adds it to the list of routers.
     * @param {string[]|string} method - The HTTP method(s) to use.
     * @param {string} path - The path to use.
     * @param {[Controller,string]|Function|*} actionInfo - The action information for the router.
     * @returns {RouterHandle} - The newly created router handle.
     * @private
     */
    private _createRouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    post(path: string, actionInfo: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    get(path: string, actionInfo: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    patch(path: string, actionInfo: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    put(path: string, actionInfo: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    any(path: string, actionInfo: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    delete(path: string, actionInfo: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string[]} methodsArray
     * @param {string} path
     * @param {[Controller,string]|Function} actionInfo
     * @return {Router|RouterHandle}
     */
    match(methodsArray: string[], path: string, actionInfo: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string} path
     * @param {string} redirectUrl
     * @return {Router|RouterHandle}
     */
    redirect(path: string, redirectUrl: string): Router | RouterHandle;
    /**
     *
     * @type {Map<string,Router|RouterHandle>}
     * @private
     */
    private _routesMap;
    /**
     * loadSet
     */
    loadSet(): void;
    /**
     * get route by route name
     * @param {string} name
     * @return {Router | RouterHandle}
     * @public
     */
    public getRoute(name: string): Router | RouterHandle;
    /**
     * get route by route pathname
     * @param {string} pathname
     * @param {string} method 'post'|'put'|'get'|'delete'|'put'|'patch'
     * @return {Router|RouterHandle|Redirect}
     * @public
     */
    public getByPathname(pathname: string, method: string): Router | RouterHandle | Redirect;
}
declare namespace Route {
    export { options };
}
import Router = require("./Router");
import Controller = require("../http/controller/Controller");
import RouterHandle = require("./RouterHandle");
import Redirect = require("./Redirect");
/**
 * Options object for configuring something.
 */
type options = {
    /**
     * - The prefix to use.
     */
    prefix: string;
    /**
     * - An array of middleware to use.
     */
    middleware: string[];
};

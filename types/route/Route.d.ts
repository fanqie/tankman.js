export = Route;
/**
 *
 */
declare class Route {
    /**
     *
     * @param {{prefix: string, middleware: string[]}|undefined} [options=undefined]
     */
    constructor(options?: {
        prefix: string;
        middleware: string[];
    } | undefined);
    /**
     * @type  string
     * @private
     */
    private _prefix;
    _group_middleware: any[];
    /**
     *
     * @type {{prefix: string, middleware: string[]}}
     */
    options: {
        prefix: string;
        middleware: string[];
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
     * @param {string[]|string} method
     * @param {string} path
     * @param {[Controller,string]|Function} controllerOrActionFunc
     * @return {Router}
     * @private
     */
    private _createRouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} controllerOrActionFunc
     * @return {Router|RouterHandle}
     */
    post(path: string, controllerOrActionFunc: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} controllerOrActionFunc
     * @return {Router|RouterHandle}
     */
    get(path: string, controllerOrActionFunc: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} controllerOrActionFunc
     * @return {Router|RouterHandle}
     */
    patch(path: string, controllerOrActionFunc: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} controllerOrActionFunc
     * @return {Router|RouterHandle}
     */
    put(path: string, controllerOrActionFunc: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} controllerOrActionFunc
     * @return {Router|RouterHandle}
     */
    any(path: string, controllerOrActionFunc: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string} path
     * @param {[Controller,string]|Function} controllerOrActionFunc
     * @return {Router|RouterHandle}
     */
    delete(path: string, controllerOrActionFunc: [Controller, string] | Function): Router | RouterHandle;
    /**
     * @param {string[]} methodsArray
     * @param {string} path
     * @param {[Controller,string]|Function} controllerOrActionFunc
     * @return {Router|RouterHandle}
     */
    match(methodsArray: string[], path: string, controllerOrActionFunc: [Controller, string] | Function): Router | RouterHandle;
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
import Router = require("./Router");
import Controller = require("../http/controller/Controller");
import RouterHandle = require("./RouterHandle");
import Redirect = require("./Redirect");

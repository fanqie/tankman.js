export = Route;
/**
 *
 */
declare class Route {
    /**
     *
     * @param options
     */
    constructor(options: any);
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
    All(): Router[];
    /**
     *
     * @param prefix
     * @param func:route {Function:route{Router|RouterHandel} }
     * @param groupMiddlewareItems
     * @returns {Route}
     * @constructor
     */
    Group(prefix: any, func: (route: any) => void, groupMiddlewareItems: any): Route;
    /**
     * @param path
     * @return {string}
     * @public
     */
    public GetPath(path: any): string;
    /**
     * @param method {string[]|string}
     * @param path {string}
     * @param controllerClassOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router}
     * @private
     */
    private _CreateRouterHandle;
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Post(path: string, controllerClassOrActionFunc: Controller | Function, action: string | null): Router | RouterHandle;
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Get(path: string, controllerClassOrActionFunc: Controller | Function, action: string | null): Router | RouterHandle;
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Patch(path: string, controllerClassOrActionFunc: Controller | Function, action: string | null): Router | RouterHandle;
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Put(path: string, controllerClassOrActionFunc: Controller | Function, action: string | null): Router | RouterHandle;
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Any(path: string, controllerClassOrActionFunc: Controller | Function, action: string | null): Router | RouterHandle;
    /**
     * @param path {string}
     * @param controllerClassOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Delete(path: string, controllerClassOrActionFunc: Controller | Function, action: string | null): Router | RouterHandle;
    /**
     * @param methodsArray {string[]}
     * @param path {string}
     * @param controllerClassOrActionFunc {Controller|Function}
     * @param action {string?}
     * @return {Router|RouterHandle}
     */
    Match(methodsArray: string[], path: string, controllerClassOrActionFunc: Controller | Function, action: string | null): Router | RouterHandle;
    /**
     * @param path
     * @param redirectUrl
     * @return {Router|RouterHandle}
     */
    Redirect(path: any, redirectUrl: any): Router | RouterHandle;
    /**
     *
     * @type {Map<string,Router|RouterHandle>}
     * @private
     */
    private _routesMap;
    LoadSet(): void;
    /**
     * Get route by route name
     * @param name {string}
     * @return {Router | RouterHandle}
     * @public
     */
    public GetRoute(name: string): Router | RouterHandle;
    /**
     * Get route by route pathname
     * @param pathname {string}
     * @param method {string} post|put|get|delete|put
     * @return {Router|RouterHandle|Redirect}
     * @public
     */
    public GetByPathname(pathname: string, method: string): Router | RouterHandle | Redirect;
}
import Router = require("./Router");
import Controller = require("../http/controller/Controller");
import RouterHandle = require("./RouterHandle");
import Redirect = require("./Redirect");

export = RouterHandle;
declare class RouterHandle extends Router {
    /**
     * @param options {{middlewares: *[], prefix: string}}
     * @param methods {string|string[]}
     * @param vPath {string}
     * @param controllerClassOrActionFunc {ClassDecorator|Function}
     * @param action {string}
     * @param action
     */
    constructor(options: {
        middlewares: any[];
        prefix: string;
    }, methods: string | string[], vPath: string, controllerClassOrActionFunc: ClassDecorator | Function, action: string);
    _IsClass(val: any): boolean;
    /**
     * get url values
     * @param path
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    is(path: any, method: any): {
        path: string;
        index: number;
        params: {};
    } | boolean;
    /**
     * middleware
     * @param middleware {string[]|string}
     * @public
     */
    public Middleware(middleware: string[] | string): RouterHandle;
    /**
     * Get Any route action
     * @return {*|Function}
     * @constructor
     */
    GetInstanceAction(): any | Function;
}
import Router = require("./Router");
import path = require("path");

export = RouterHandle;
declare class RouterHandle extends Router {
    /**
     * @param options {{middleware: *[], prefix: string}}
     * @param methods {string|string[]}
     * @param vPath {string}
     * @param controllerOrActionFunc {[Controller,Function]|Function}
     * @param action
     */
    constructor(options: {
        middleware: any[];
        prefix: string;
    }, methods: string | string[], vPath: string, controllerOrActionFunc: [Controller, Function] | Function);
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
     * @returns {Router|RouterHandle}
     */
    public Middleware(middleware: string[] | string): Router | RouterHandle;
    /**
     * Get Any route action
     * @return {function(*): *}
     * @function
     */
    GetInstanceAction(): (arg0: any) => any;
}
import Router = require("./Router");
import Controller = require("../http/controller/Controller");

import CtxPipeline = require("../http/pipeline/CtxPipeline");

export = RouterHandle;
declare class RouterHandle extends Router {
    /**
     * @param options {{middleware: *[], prefix: string}}
     * @param methods {string|string[]}
     * @param vPath {string}
     * @param controllerClassOrActionFunc {Controller|Function}
     * @param action {string}
     * @param action
     */
    constructor(options: {
        middleware: any[];
        prefix: string;
    }, methods: string | string[], vPath: string, controllerClassOrActionFunc: Controller | Function, action: string);
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
     * @return {Promise<CtxPipeline|boolean>}
     * @constructor
     */
    GetInstanceAction(): Promise<CtxPipeline | boolean>;
}
import Router = require("./Router");
import Controller = require("../http/controller/Controller");

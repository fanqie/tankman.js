export = RouterHandle;
/**
 * RouterHandle
 */
declare class RouterHandle extends Router {
    /**
     * @param {{middleware: *[], prefix: string}} options
     * @param {string|string[]} methods
     * @param {string} vPath
     * @param {[Controller,string]|Function} controllerOrActionFunc
     * @constructor
     */
    constructor(options: {
        middleware: any[];
        prefix: string;
    }, methods: string | string[], vPath: string, controllerOrActionFunc: [Controller, string] | Function);
    /**
     * check class
     * @param {mixin} val
     * @return {boolean}
     * @private
     */
    private _isClass;
    /**
     * middleware
     * @param {string[]|string} middleware
     * @public
     * @return {Router|RouterHandle}
     */
    public middleware(middleware: string[] | string): Router | RouterHandle;
    /**
     * get any route action
     * @function
     * @return {function}
     */
    getInstanceAction(): Function;
}
import Router = require("./Router");
import Controller = require("../http/controller/Controller");

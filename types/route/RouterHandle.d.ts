export = RouterHandle;
/**
 * RouterHandle
 */
declare class RouterHandle extends Router {
    /**
     * Options object for configuring something.
     * @typedef {Object} Options
     * @property {string} prefix - The prefix to use.
     * @property {string[]} middleware - An array of middleware to use.
     */
    /**
     * @param {Options} options
     * @param {string|string[]} methods
     * @param {string} vPath
     * @param {[Controller,string]|Function} actionInfo
     * @param {string} name
     * @constructor
     */
    constructor(options: {
        /**
         * - The prefix to use.
         */
        prefix: string;
        /**
         * - An array of middleware to use.
         */
        middleware: string[];
    }, methods: string | string[], vPath: string, actionInfo: [Controller, string] | Function, name?: string);
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

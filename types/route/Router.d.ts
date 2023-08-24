export = Router;
/**
 *
 */
declare class Router {
    /**
     *
     * @param {Object} options
     * @param {...string|[Controller,string]|Function} args
     * @public
     */
    constructor(options: any, ...args: (string | [Controller, string] | Function)[]);
    /**
     *
     * @type {{prefix: string, middleware: string[]}}
     * @public
     */
    public options: {
        prefix: string;
        middleware: string[];
    };
    /**
     *
     * @type {string[]}
     * @public
     */
    public methods: string[];
    /**
     * input path value
     * @type {string}
     * @public
     */
    public vPath: string;
    /**
     * input redirect next page url value
     * @type {string}
     * @public
     */
    public redirectUrl: string;
    /**
     * _MakePath
     * @type {string}
     * @public
     */
    public path: string;
    /**
     *
     * @type {Controller}
     * @public
     */
    public controllerClass: Controller;
    /**
     *
     * @type {Function}
     * @public
     */
    public actionFunc: Function;
    /**
     *
     * @type {string}
     * @public
     */
    public action: string;
    /**
     *
     * @type  {import("path-to-regexp").MatchFunction<object>}
     * @public
     */
    public match: import("path-to-regexp").MatchFunction<object>;
    name: string;
    params: {};
    /**
     * url
     * @return {string}
     * @protected
     */
    protected makePath(): string;
    /**
     * @typedef {import('path-to-regexp').MatchFunction<object>} MatchFunction
     * @return {MatchFunction}
     */
    makeMath(): pathToRegexp.MatchFunction<any>;
    /**
     * options {{middleware: *[], prefix: string}}
     * @param {{}} options
     * @private
     */
    private _setOptions;
    /**
     * parse url
     * @param {string} path
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    parse(path: string): {
        path: string;
        index: number;
        params: {};
    } | boolean;
    /**
     * get url values
     * @param {string} path
     * @param {string} method
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    is(path: string, method: string): {
        path: string;
        index: number;
        params: {};
    } | boolean;
    /**
     * setName
     * @param {string} name
     * @return {Router|undefined}
     * @public
     */
    public routeName(name: string): Router | undefined;
}
import Controller = require("../http/controller/Controller");
import pathToRegexp = require("path-to-regexp");
import path = require("path");

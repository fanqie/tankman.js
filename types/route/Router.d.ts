export = Router;
declare class Router {
    /**
     *
     * @param options
     * @param args
     * @public
     */
    constructor(options: any, ...args: any[]);
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
     * @type {ClassDecorator|Function}
     * @public
     */
    public controllerClass: ClassDecorator | Function;
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
    protected MakePath(): string;
    /**
     *
     * @return {import("path-to-regexp").MatchFunction<object>}
     * @public
     */
    public MakeMath(): import("path-to-regexp").MatchFunction<object>;
    /**
     * options {{middleware: *[], prefix: string}}
     * @param options
     * @private
     */
    private _SetOptions;
    /**
     * parse url
     * @param path
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    Parse(path: any): {
        path: string;
        index: number;
        params: {};
    } | boolean;
    /**
     * get url values
     * @param path
     * @param method
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    Is(path: any, method: any): {
        path: string;
        index: number;
        params: {};
    } | boolean;
    /**
     * setName
     * @param name {string}
     * @return Router|undefined
     * @public
     */
    public Name(name: string): Router;
}
import path = require("path");

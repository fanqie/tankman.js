const path = require("path");
const pathToRegexp = require("path-to-regexp");
const { Facades } = require("../Index");
class Router {
    /**
     *
     * @param options
     * @param args
     * @public
     */
    constructor(options, ...args) {
        /**
         *
         * @type {{prefix: string, middleware: string[]}}
         * @public
         */
        this.options = {
            prefix: "",
            middleware: []
        };
        /**
         *
         * @type {string[]}
         * @public
         */
        this.methods = [];
        /**
         * input path value
         * @type {string}
         * @public
         */
        this.vPath = "";
        /**
         * input redirect next page url value
         * @type {string}
         * @public
         */
        this.redirectUrl = "";
        /**
         * _MakePath
         * @type {string}
         * @public
         */
        this.path = "";
        /**
         *
         * @type {ClassDecorator|Function}
         * @public
         */
        this.controllerClass = null;
        /**
         *
         * @type {Function}
         * @public
         */
        this.actionFunc = null;
        /**
         *
         * @type {string}
         * @public
         */
        this.action = "Index";
        this.name = "";
        this._SetOptions(options);
    }
    /**
     * url
     * @return {string}
     * @protected
     */
    MakePath() {
        return path.join(this.options.prefix, this.vPath).replace(/\\/g, "/");
    }
    /**
     *
     * @return {import("path-to-regexp").MatchFunction<object>}
     * @public
     */
    MakeMath() {
        return pathToRegexp.match(this.path, {
            decode: decodeURIComponent,
        });
    }
    /**
     * options {{middleware: *[], prefix: string}}
     * @param options
     * @private
     */
    _SetOptions(options) {
        this.options = Object.assign(Object.assign({}, this.options), options);
    }
    /**
     * parse url
     * @param path
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    Parse(path) {
        return this.match(path);
    }
    /**
     * get url values
     * @param path
     * @param method
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    Is(path, method) {
        path = path.toLowerCase();
        method = method.toLowerCase();
        if (this.methods.includes(method)) {
            return this.Parse(path);
        }
    }
    /**
     * setName
     * @param name {string}
     * @return Router|undefined
     * @public
     */
    Name(name) {
        if (name) {
            this.name = name;
        }
        return this;
    }
}
module.exports = Router;

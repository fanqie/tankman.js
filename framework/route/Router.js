const path = require("path")
const pathToRegexp = require("path-to-regexp")
const Facades = require("../facades/Facades");

class Router {
    /**
     *
     * @type {{prefix: string, middleware: string[]}}
     * @public
     */
    options = {
        prefix: "",
        middleware: []
    }

    /**
     *
     * @type {string[]}
     * @public
     */
    methods = [];
    /**
     * input path value
     * @type {string}
     * @public
     */
    vPath = "";
    /**
     * input redirect next page url value
     * @type {string}
     * @public
     */
    redirectUrl = "";
    /**
     * _MakePath
     * @type {string}
     * @public
     */
    path = "";
    /**
     *
     * @type {ClassDecorator|Function}
     * @public
     */
    controllerClass = null;
    /**
     *
     * @type {Function}
     * @public
     */
    actionFunc = null;
    /**
     *
     * @type {string}
     * @public
     */
    action = "Index";
    /**
     *
     * @type  {import("path-to-regexp").MatchFunction<object>}
     * @public
     */
    match

    name = "";
    params = {}

    /**
     *
     * @param options
     * @param args
     * @public
     */
    constructor(options, ...args) {
        this._SetOptions(options)
    }

    /**
     * url
     * @return {string}
     * @protected
     */
    MakePath() {
        return path.join(this.options.prefix, this.vPath).replace(/\\/g, "/")
    }

    /**
     *
     * @return {import("path-to-regexp").MatchFunction<object>}
     * @public
     */
    MakeMath() {
        return pathToRegexp.match(this.path, {
            decode: decodeURIComponent,
        })
    }

    /**
     * options {{middleware: *[], prefix: string}}
     * @param options
     * @private
     */
    _SetOptions(options) {
        this.options = {...this.options, ...options}
    }

    /**
     * parse url
     * @param path
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    Parse(path) {
        return this.match(path)
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
            const res = this.Parse(path)
            if (res) {
                // @ts-ignore
                this.params = res.params
                return res
            }
        }
        return false
    }


    /**
     * setName
     * @param name {string}
     * @return Router|undefined
     * @public
     */
    Name(name) {
        if (name) {
            this.name = name
        }
        return this

    }


}

module.exports = Router;

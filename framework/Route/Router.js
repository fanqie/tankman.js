const path = require("path")
const pathToRegexp = require("path-to-regexp")
const {FC} = require("../Index");

class Router {
    /**
     *
     * @type {{prefix: string, middlewares: [string]}}
     */
    options = {
        prefix: "",
        middlewares: []
    }

    /**
     *
     * @type {[string]}
     */
    methods = []
    /**
     * input path value
     * @type {string}
     */
    vPath = ""
    /**
     * input redirect next page url value
     * @type {string}
     */
    redirectUrl = ""
    /**
     * _MakePath
     * @type {string}
     */
    path = ""
    /**
     *
     * @type {Function}
     */
    action = (ctx) => {
    }
    /**
     * RegExp
     * @type {MatchFunction<object>|Function}
     */
    match = null

    name = ""

    /**
     *
     * @param options
     * @param args
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
     * @return {MatchFunction<object>|Function}
     * @protected
     */
    MakeMath() {
        return pathToRegexp.match(this.path, {
            decode: decodeURIComponent,
        })
    }

    /**
     * options {{middlewares: *[], prefix: string}}
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
        // this.path
        return this.match(path)
    }

    /**
     * get url values
     * @param path
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    Is(path, method) {
        path = path.toLowerCase()
        method = method.toLowerCase()
        if (this.methods.includes(method)) {
            return this.Parse(path)
        }

    }


    /**
     * setName
     * @param name {string}
     * @return Router|undefined
     * @constructor
     */
    Name(name) {
        if (name) {
            this.name = name
        }
        FC.Route.LoadSet()
        return this

    }


}

module.exports = Router

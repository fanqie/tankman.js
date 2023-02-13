const RouterHandle = require("./RouterHandle")
const {REQUEST_METHOD} = require("./Enums")
const Group = require("./Group")

/**
 *
 */
class Route {

    /**
     *
     * @param options
     */
    constructor(options) {
        this.options = {...options}
    }

    /**
     *
     * @type {*}
     * @private
     */
    _routers = new Map()

    /**
     *
     * @param prefix
     * @return {Group}
     * @constructor
     */
    static Prefix(prefix) {
        return new Group({prefix: prefix})
    }

    /**
     *
     * @param middleware
     * @return {Group}
     * @constructor
     */
    static Middleware(middleware) {
        return new Group({middleware: middleware})
    }

    /**
     *
     * @type {{prefix: string, middleware: string}}
     */
    options = {
        prefix: "",
        middleware: ""
    }

    /**
     *
     * @param func
     * @constructor
     */
    static Group(func) {
        // console.log(func.apply(this))
    }

    /**
     *
     * @param path
     * @return {string}
     * @constructor
     */
    GetPath(path) {
        return this.options.prefix ? this.options.prefix + "/" : "" + path
    }

    /**
     *
     * @param prefix
     * @return {Group}
     * @constructor
     */
    Prefix(prefix) {
        return new Group({prefix: prefix})
    }

    /**
     *
     * @param middleware
     * @return {Group}
     * @constructor
     */
    Middleware(middleware) {
        return new Group({middleware: middleware})
    }

    /**
     *
     * @param method
     * @param path
     * @param action
     * @return {Router}
     * @private
     */
    _CreateRouterHandle(method, path, action) {
        const handle = new RouterHandle(REQUEST_METHOD.PATCH, path, action)
        this._routers.get(REQUEST_METHOD.PATCH).set(path, handle)
        return handle;
    }

    /**
     *
     * @param path
     * @param action
     * @constructor
     */
    static Post(path, action) {
    }

    /**
     *
     * @param path
     * @param action
     * @constructor
     */
    static Get(path, action) {
    }

    /**
     *
     * @private
     */
    static _setRouterHandle() {

    }

    /**
     *
     * @param path
     * @param action
     * @constructor
     */
    static Patch(path, action) {

    }

    /**
     *
     * @param path
     * @param action
     * @constructor
     */
    static Put(path, action) {

    }

    /**
     *
     * @param path
     * @param action
     * @constructor
     */
    static Any(path, action) {

    }

    /**
     *
     * @param path
     * @param action
     * @constructor
     */
    static Delete(path, action) {

    }

    /**
     *
     * @param methodArray
     * @param path
     * @param action
     * @constructor
     */
    static Match(methodArray, path, action) {

    }

    /**
     *
     * @param path
     * @param redirectUrl
     * @param status
     */
    static redirect(path, redirectUrl, status) {

    }

}

module.exports = Route

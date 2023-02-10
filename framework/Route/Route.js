const RouterHandle = require("./RouterHandle")
const {REQUEST_METHOD} = require("./Enums")
const Group = require("./Group")
module.exports = class Route {
    routes = new Map()

    constructor(options) {
        this.options = {...options}
    }


    _routers = new Map()

    static Prefix(prefix) {
        return new Group({prefix: prefix})
    }

    static Middleware(middleware) {
        return new Group({middleware: middleware})
    }

    options = {
        prefix: "",
        middleware: ""
    }


    static Group(func) {
        // console.log(func.apply(this))
    }

    GetPath(path) {
        return this.options.prefix ? this.options.prefix + "/" : "" + path
    }

    Prefix(prefix) {
        return new Group({prefix: prefix})
    }

    Middleware(middleware) {
        return new Group({middleware: middleware})
    }

    _CreateRouterHandle(method, path, action) {
        const handle = new RouterHandle(REQUEST_METHOD.PATCH, path, action)
        this._routers.get(REQUEST_METHOD.PATCH).set(path, handle)
        return handle;
    }

    static Post(path, action) {
    }

    static Get(path, action) {
    }

    static _setRouterHandle() {

    }

    static Patch(path, action) {

    }

    static Put(path, action) {

    }

    static Any(path, action) {

    }

    static Delete(path, action) {

    }

    static Match(methodArray, path, action) {

    }

    static redirect(path, redirectUrl, status) {

    }

}


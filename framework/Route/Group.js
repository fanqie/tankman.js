/**
 *
 */
class Group {
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
     * @param options
     */
    constructor(options) {
        this.options = {...options}
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
     * @return {Group.Group}
     * @constructor
     */
    Prefix(prefix) {
        return new Group({prefix: prefix})
    }

    /**
     *
     * @param middleware
     * @return {Group.Group}
     * @constructor
     */
    Middleware(middleware) {
        return new Group({middleware: middleware})
    }
}

module.exports = Group

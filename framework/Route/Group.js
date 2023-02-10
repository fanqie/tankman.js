module.exports = class Group {
    options = {
        prefix: "",
        middleware: ""
    }

    constructor(options) {
        this.options = {...options}
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
}

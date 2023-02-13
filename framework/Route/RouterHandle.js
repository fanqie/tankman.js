class Router {
    /**
     *
     * @type {string}
     */
    method = "get"
    /**
     *
     * @type {string}
     */
    path = ""
    /**
     *
     * @type {null}
     */
    action = null

    /**
     *
     * @param method
     * @param path
     * @param action
     */
    constructor(method, path, action) {
        this.method = method
        this.path = path
        this.action = action
    }

    Group(func) {
        func.apply(this)
    }


}

module.exports = Router

module.exports = class Router {
    method = "get"
    path = ""
    action = null


    constructor(method, path, action) {
        this.method = method
        this.path = path
        this.action = action
    }
    Group(func) {
        func.apply(this)
    }



}

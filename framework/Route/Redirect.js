const pathToRegexp = require("path-to-regexp")
const Router = require("./Router");
class Redirect extends Router{
    /**
     *
     * @param methods [{string}]
     * @param path
     * @param options {{middlewares: *[], prefix: string}}
     * @param action
     */
    constructor(options = {}, methods, vPath, action) {
        super();
        super.methods = methods
        super.vPath = vPath
        super.path = super.MakePath()
        super.action = action
        super.match = super.MakeMath()
    }
    /**
     * get url values
     * @param path
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    is(path, method) {
        path = path.toLowerCase()
        method = method.toLowerCase()
        if (this.methods.includes(method)) {
            return super.parse(path)
        }
    }

}

module.exports = Redirect

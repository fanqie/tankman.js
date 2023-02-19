const Router = require("./Router");
const {REQUEST_METHOD} = require("./Enums")

class Redirect extends Router {
    /**
     *
     * @param options {{middlewares: *[], prefix: string}}
     * @param path {string}
     * @param action
     */
    constructor(options = {}, vPath, redirectUrl) {
        super();
        super.methods = ["get"]
        super.vPath = vPath
        super.redirectUrl = redirectUrl
        super.path = super.MakePath()
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
        if (method === REQUEST_METHOD.GET) {
            return super.Parse(path)
        }
    }

}

module.exports = Redirect

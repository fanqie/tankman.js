const Router = require('./Router');
const {REQUEST_METHOD} = require('./Enums');

class Redirect extends Router {
    /**
     *
     * @param {{middleware: *[], prefix: string}} options
     * @param {string} vPath
     * @param  {string} redirectUrl
     */
    constructor(options, vPath, redirectUrl) {
        super(options, vPath, redirectUrl);
        super.methods = ['get'];
        super.vPath = vPath;
        super.redirectUrl = redirectUrl;
        super.path = super.makePath();
        super.match = super.makeMath();
    }

    /**
     * get url values
     * @param {string} path
     * @param {string} method
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    is(path, method) {
        path = path.toLowerCase();
        method = method.toLowerCase();
        if (method === REQUEST_METHOD.GET) {
            return super.parse(path);
        }
    }
}

module.exports = Redirect;

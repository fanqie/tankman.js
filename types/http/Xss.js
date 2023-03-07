const _xss = require("xss");
const Facades = require("../facades/Facades");
module.exports = class Xss {
    /**
     * @type Xss
     * @constructor
     */
    constructor() {
        /**
         *
         * @type {{whiteField: string[], routerWhiteList: string[], options: {css: {}, whiteList: {}}}}
         * @inheritDoc https://github.com/leizongmin/js-xss/blob/master/README.md
         */
        this.conf = {
            routerWhiteList: [],
            whiteField: [],
            options: {
                css: {},
                whiteList: {},
            }
        };
        this._xss = new _xss.FilterXSS(Facades.Config.Get("xss") || this.conf.options);
    }
    /**
     *
     * @param httpRequest
     * @param value
     * @return {string}
     * @constructor
     */
    Filter(httpRequest, value) {
        if (typeof value === "string" && !this.conf.routerWhiteList.includes(httpRequest.GetRoute().path)) {
            return this._xss.process(value);
        }
        return value;
    }
};

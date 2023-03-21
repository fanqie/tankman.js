export = Xss;
declare class Xss {
    /**
     *
     * @type {{whiteField: string[], routerWhiteList: string[], options: {css: {}, whiteList: {}}}}
     * @inheritDoc https://github.com/leizongmin/js-xss/blob/master/README.md
     */
    conf: {
        whiteField: string[];
        routerWhiteList: string[];
        options: {
            css: {};
            whiteList: {};
        };
    };
    _xss: _xss.FilterXSS;
    /**
     *
     * @param {HttpRequest} httpRequest
     * @param {string|*} value
     * @return {string}
     * @constructor
     */
    filter(httpRequest: HttpRequest, value: string | any): string;
}
import _xss = require("xss");
import HttpRequest = require("./context/HttpRequest");

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
     * @param httpRequest
     * @param value
     * @return {string}
     * @constructor
     */
    Filter(httpRequest: any, value: any): string;
}
import _xss = require("xss");

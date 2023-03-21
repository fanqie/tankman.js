const _xss = require('xss');
const facades = require('../facades/Facades');
const HttpRequest = require('./context/HttpRequest');
module.exports = class Xss {
    /**
     *
     * @type {{whiteField: string[], routerWhiteList: string[], options: {css: {}, whiteList: {}}}}
     * @inheritDoc https://github.com/leizongmin/js-xss/blob/master/README.md
     */
    conf = {
        routerWhiteList: [],
        whiteField: [],
        options: {
            css: {},
            whiteList: {},
        },
    };
    _xss;

    /**
     * @type {Xss}
     * @constructor
     */
    constructor() {
        this._xss = new _xss.FilterXSS(facades.config.get('xss') || this.conf.options);
    }

    /**
     *
     * @param {HttpRequest} httpRequest
     * @param {string|*} value
     * @return {string}
     * @constructor
     */
    filter(httpRequest, value) {
        if (typeof value === 'string' && !this.conf.routerWhiteList.includes(httpRequest.getRouter().path)) {
            return this._xss.process(value);
        }
        return value;
    }
};

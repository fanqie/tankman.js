const path = require('path');
const pathToRegexp = require('path-to-regexp');
const Facades = require('../facades/Facades');
const Controller = require('../http/controller/Controller');

/**
 *
 */
class Router {
    /**
     *
     * @type {{prefix: string, middleware: string[]}}
     * @public
     */
    options = {
        prefix: '',
        middleware: [],
    };

    /**
     *
     * @type {string[]}
     * @public
     */
    methods = [];
    /**
     * input path value
     * @type {string}
     * @public
     */
    vPath = '';
    /**
     * input redirect next page url value
     * @type {string}
     * @public
     */
    redirectUrl = '';
    /**
     * _MakePath
     * @type {string}
     * @public
     */
    path = '';
    /**
     *
     * @type {Controller}
     * @public
     */
    controllerClass = null;
    /**
     *
     * @type {Function}
     * @public
     */
    actionFunc = null;
    /**
     *
     * @type {string}
     * @public
     */
    action = 'Index';
    /**
     *
     * @type  {import("path-to-regexp").MatchFunction<object>}
     * @public
     */
    match;

    name = '';
    params = {};

    /**
     *
     * @param {Object} options
     * @param {...string|[Controller,string]|Function} args
     * @public
     */
    constructor(options, ...args) {
        this._setOptions(options);
    }

    /**
     * url
     * @return {string}
     * @protected
     */
    makePath() {
        return path.join(this.options.prefix, this.vPath).replace(/\\/g, '/');
    }
    // eslint-disable-next-line valid-jsdoc
    /**
     * @typedef {import('path-to-regexp').MatchFunction<object>} MatchFunction
     * @return {MatchFunction}
     */
    makeMath() {
        return pathToRegexp.match(this.path, {
            decode: decodeURIComponent,
        });
    }

    /**
     * options {{middleware: *[], prefix: string}}
     * @param {{}} options
     * @private
     */
    _setOptions(options) {
        this.options = {...this.options, ...options};
    }

    /**
     * parse url
     * @param {string} path
     * @return {{ path: string, index: number, params: {} }|boolean}
     */
    parse(path) {
        return this.match(path);
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
        if (this.methods.includes(method)) {
            const res = this.parse(path);
            if (res) {
                // @ts-ignore
                this.params = res.params;
                return res;
            }
        }
        return false;
    }


    /**
     * setName
     * @param {string} name
     * @return {Router|undefined}
     * @public
     */
    routeName(name) {
        if (name) {
            this.name = name;
        }
        return this;
    }
}

module.exports = Router;

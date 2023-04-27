// @ts-nocheck
const Router = require('./Router');
const Controller = require('../http/controller/Controller');
const Facades = require('../facades/Facades');
const ControllerSingletonFactory = require("../factor/ControllerSingletonFactory");

/**
 * RouterHandle
 */
class RouterHandle extends Router {
    /**
     * Options object for configuring something.
     * @typedef {Object} Options
     * @property {string} prefix - The prefix to use.
     * @property {string[]} middleware - An array of middleware to use.
     */
    /**
     * @param {Options} options
     * @param {string|string[]} methods
     * @param {string} vPath
     * @param {[Controller,string]|Function} actionInfo
     * @param {string} name
     * @constructor
     */
    constructor(options = {
        middleware: [],
        prefix: '',
    }, methods, vPath, actionInfo, name = "") {
        super(options, methods, vPath, actionInfo);
        super.methods = Array.isArray(methods) ? methods : [methods];
        super.vPath = vPath;
        super.path = super.makePath();
        super.name = name || vPath;
        if (Array.isArray(actionInfo)) {
            super.controllerClass = ControllerSingletonFactory.make(actionInfo[0]);
            super.action = actionInfo[1];
        } else {
            super.actionFunc = actionInfo;
        }

        // @ts-ignore
        super.match = super.makeMath();
    }

    /**
     * check class
     * @param {mixin} val
     * @return {boolean}
     * @private
     */
    _isClass(val) {
        return /^class\s/.test(Object.valueOf.toString.call(val)); // false
    }

    /**
     * get url values
     * @param {string} path
     * @param {string} method
     * @return {{path: string, index: number, params: {}}|boolean}
     */
    is(path, method) {
        path = path.toLowerCase();
        method = method.toLowerCase();
        if (this.methods.includes(method)) {
            return super.parse(path);
        }
    }

    /**
     * middleware
     * @param {string[]|string} middleware
     * @public
     * @return {Router|RouterHandle}
     */
    middleware(middleware) {
        if (typeof middleware == 'string') {
            middleware = [middleware];
        }
        this.options.middleware = [...this.options.middleware, ...middleware];
        return this;
    }

    /**
     * get any route action
     * @function
     * @return {function}
     */
    getInstanceAction() {
        // @ts-ignore
        const instance = this.controllerClass;
        return (httpContext) => {
            return instance ? instance.__proto__[this.action]
                    .call(instance, httpContext, Object.values(httpContext.params)) :
                this.actionFunc(httpContext, Object.values(httpContext.params));
        };
    }
}

module.exports = RouterHandle;

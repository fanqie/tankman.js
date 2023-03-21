// @ts-nocheck
const Router = require('./Router');
const Controller = require('../http/controller/Controller');
const Facades = require('../facades/Facades');

/**
 * RouterHandle
 */
class RouterHandle extends Router {
    /**
     * @param {{middleware: *[], prefix: string}} options
     * @param {string|string[]} methods
     * @param {string} vPath
     * @param {[Controller,string]|Function} controllerOrActionFunc
     */
    constructor(options = {
        middleware: [],
        prefix: '',
    }, methods, vPath, controllerOrActionFunc) {
        super(options, methods, vPath, controllerOrActionFunc);
        super.methods = Array.isArray(methods) ? methods : [methods];
        super.vPath = vPath;
        super.path = super.makePath();
        if (Array.isArray(controllerOrActionFunc)) {
            if (this._isClass(controllerOrActionFunc[0]) && controllerOrActionFunc.length === 2) {
                super.controllerClass = Facades.app.singleton(controllerOrActionFunc[0]);
                super.action = controllerOrActionFunc[1];
            } else {
                throw new Error('Parameter error must be:[Controller,Function]|Function');
            }
        } else {
            super.actionFunc = controllerOrActionFunc;
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

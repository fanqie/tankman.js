const facades = require('../facades/Facades');
const LoadEnvironmentVariables = require('./LoadEnvironmentVariables');

module.exports = class Env {
    /**
     *
     * @type {{}}
     * @private
     */
    _envs = {};

    /**
     *
     */
    constructor() {
    }

    /**
     *
     * @return {{}}
     * @public
     */
    all() {
        return this._envs;
    }


    /**
     *
     * @param {string} name
     * @param {*} [defaultVal=null]
     * @return {*|null}
     * @public
     */
    get(name, defaultVal = null) {
        return this._envs[name] || defaultVal;
    }

    /**
     *
     * @param {string} name
     * @param {*} value
     * @private
     */
    set(name, value) {
        this._envs[name] = value;
    }

    /**
     * update or append a env filed
     * @param {string} name
     * @param {*} value
     * @function
     * @public
     */
    setAsFile(name, value) {
        this._envs[name] = value;
        LoadEnvironmentVariables.appendToFile(name, value, facades.processInfo.flags.get('--ENV') || '');
    }

    /**
     * @function
     * @public
     */
    load() {
    // load Environment Variables
        const envs = LoadEnvironmentVariables.load(facades.processInfo.flags.get('--ENV') || '');
        this._envs = {...this._envs, ...envs};
    }

    /**
     * check app run env is debugger mode
     * @return {boolean}
     * @public
     */
    isDebugger() {
        return this.get('APP_DEBUG', 'true') === 'true';
    }
};



const Facades = require("../facades/Facades");
const LoadEnvironmentVariables = require("./LoadEnvironmentVariables");
module.exports = class Env {
    /**
     *
     */
    constructor() {
        /**
         *
         * @type {{}}
         * @private
         */
        this._Envs = {};
    }
    /**
     *
     * @return {{}}
     * @public
     */
    All() {
        return this._Envs;
    }
    /**
     *
     * @param name
     * @param defaultVal
     * @return {*|null}
     * @public
     */
    Get(name, defaultVal = null) {
        return this._Envs[name] || defaultVal;
    }
    /**
     *
     * @param name
     * @param v
     * @private
     */
    Set(name, v) {
        this._Envs[name] = v;
    }
    /**
     *
     * @public
     */
    Load() {
        //Load Environment Variables
        const envs = LoadEnvironmentVariables.Load(Facades.ProcessInfo.Flags.get("--ENV") || "");
        this._Envs = Object.assign(Object.assign({}, this._Envs), envs);
    }
    /**
     * check app run env is debugger mode
     * @returns {boolean}
     * @constructor
     */
    IsDebugger() {
        return this.Get("APP_DEBUG", 'true') === 'true';
    }
};

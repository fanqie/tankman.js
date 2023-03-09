const Facades = require("../facades/Facades");
const LoadEnvironmentVariables = require("./LoadEnvironmentVariables");

module.exports = class Env {
    /**
     *
     * @type {{}}
     * @private
     */
    _Envs = {};

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
    All() {
        return this._Envs
    }


    /**
     *
     * @param name
     * @param defaultVal
     * @return {*|null}
     * @public
     */
    Get(name, defaultVal = null) {
        return this._Envs[name] || defaultVal
    }

    /**
     *
     * @param name
     * @param value
     * @private
     */
    Set(name, value) {
        this._Envs[name] = value
    }

    /**
     * update or append a env filed
     * @param name
     * @param value
     * @function
     * @public
     */
    SetAsFile(name, value) {
        this._Envs[name] = value
        LoadEnvironmentVariables.AppendToFile(name, value, Facades.ProcessInfo.Flags.get("--ENV") || "")
    }

    /**
     * @function
     * @public
     */
    Load() {
        //Load Environment Variables
        const envs = LoadEnvironmentVariables.Load(Facades.ProcessInfo.Flags.get("--ENV") || "")
        this._Envs = {...this._Envs, ...envs}

    }

    /**
     * check app run env is debugger mode
     * @returns {boolean}
     * @public
     */
    IsDebugger() {
        return this.Get("APP_DEBUG", 'true') === 'true'
    }
}




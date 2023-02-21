const Facades = require("../Facades");
const LoadEnvironmentVariables = require("./LoadEnvironmentVariables")

/**
 *
 * @type {Env}
 */
class Env {
    /**
     *
     * @type {{}}
     * @private
     */
    _Envs = {}

    /**
     *
     */
    constructor() {
    }

    /**
     *
     * @return {{}}
     * @constructor
     */
    All() {
        return this._Envs
    }


    /**
     *
     * @param name
     * @param defaultVal
     * @return {*|null}
     * @constructor
     */
    Get(name,defaultVal=null) {
        return this._Envs[name] ||defaultVal
    }

    /**
     *
     * @param name
     * @param v
     * @private
     */
    Set(name, v) {
        this._Envs[name] = v
    }

    /**
     *
     * @constructor
     */
    Load() {
        //Load Environment Variables
        const envs = LoadEnvironmentVariables.Load(Facades.ProcessInfo.Flags.get("--ENV")||"")
        this._Envs = {...this._Envs, ...envs}

    }

    /**
     * check app run env is debugger mode
     * @returns {boolean}
     * @constructor
     */
    IsDebugger(){
        return this.Get("APP_DEBUG",'true')==='true'
    }
}


module.exports = Env

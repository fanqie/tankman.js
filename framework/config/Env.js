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
     * @public
     */
    Load() {
        //Load Environment Variables
        const envs = LoadEnvironmentVariables.Load(Facades.ProcessInfo.Flags.get("--ENV")||"")
        this._Envs = {...this._Envs, ...envs}

    }

}


module.exports = Env

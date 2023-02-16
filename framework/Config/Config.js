const Facades = require("../Facades");
const LoadConfiguration = require("./LoadConfigration");

/**
 * Config class
 * @type {Config}
 */
class Config {
    _Config = {}

    /**
     *
     */
    constructor() {
    }

    /**
     *
     * @param name
     * @param defaultVal
     * @return {*|null}
     * @constructor
     */
    Get(name, defaultVal = null) {
        return this._Config[name] || defaultVal
    }

    /**
     *
     * @param name
     * @param v
     * @constructor
     */
    Set(name, v) {
        this._Config[name] = v
    }


    /**
     *
     * @constructor
     */
    Load() {
        const Config = LoadConfiguration.Load(Facades.Config.Get("APP_CONFIG_PATH","Config"))
        this._Config = {...this._Config, ...Config}
    }


}


module.exports = Config

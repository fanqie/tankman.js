const Facades = require("../facades/Facades");
const LoadConfiguration = require("./LoadConfigration");

/**
 * config class
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
     * @public
     */
    Get(name, defaultVal = null) {
        return this._Config[name] || defaultVal
    }

    /**
     *
     * @param name
     * @param v
     * @public
     */
    Set(name, v) {
        this._Config[name] = v
    }


    /**
     *
     * @public
     */
    Load() {
        const Config = LoadConfiguration.Load(Facades.Env.Get("APP_CONFIG_DIR","./config"));
        this._Config = {...this._Config, ...Config};
    }


}


module.exports = Config;

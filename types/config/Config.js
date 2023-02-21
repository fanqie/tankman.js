const Facades = require("../facades/Facades");
const LoadConfiguration = require("./LoadConfigration");
/**
 * config class
 * @type {Config}
 */
class Config {
    /**
     *
     */
    constructor() {
        this._Config = {};
    }
    /**
     *
     * @param name
     * @param defaultVal
     * @return {*|null}
     * @public
     */
    Get(name, defaultVal = null) {
        return this._Config[name] || defaultVal;
    }
    /**
     *
     * @param name
     * @param v
     * @public
     */
    Set(name, v) {
        this._Config[name] = v;
    }
    /**
     *
     * @public
     */
    Load() {
        const Config = LoadConfiguration.Load(Facades.Config.Get("APP_CONFIG_DIR", "config"));
        this._Config = Object.assign(Object.assign({}, this._Config), Config);
    }
}
module.exports = Config;

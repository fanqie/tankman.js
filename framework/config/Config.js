const Facades = require('../facades/Facades');
const LoadConfiguration = require('./LoadConfigration');

/**
 * config class
 * @type {Config}
 */
class Config {
    _config = {};

    /**
     *
     */
    constructor() {
    }

    /**
     *
     * @param {string} name
     * @param {*} [defaultVal=null]
     * @return {*|null}
     * @public
     */
    get(name, defaultVal = null) {
        return this._config[name] || defaultVal;
    }

    /**
     *
     * @param {string} name
     * @param {*} v
     * @public
     */
    set(name, v) {
        this._config[name] = v;
    }


    /**
     *
     * @public
     */
    load() {
        const config = LoadConfiguration.load(Facades.env.get('APP_CONFIG_DIR', './config'));
        this._config = {...this._config, ...config};
    }
}


module.exports = Config;

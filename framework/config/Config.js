const Facades = require('../facades/Facades');

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
    load(configs) {
        this._config = {};
        configs.forEach((key) => {
            Object.keys(key).forEach((k) => {
                this._config[k] = key[k];
            });
        });
    }
}


module.exports = Config;

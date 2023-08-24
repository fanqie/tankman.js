const facades = require('../facades/Facades');
const ServiceProvider = require('./ServiceProvider');
const Config = require('../config/Config');

class ConfigProvider extends ServiceProvider {
    /**
     * register provider
     */
    register() {
        facades.config = new Config();
    }

    /**
     * bootstrap provider
     */
    boot() {
        facades.config.load(this.app._getConfigs());
    }

    constructor(app) {
        super(app);
    }
}

module.exports = ConfigProvider;

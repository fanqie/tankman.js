const facades = require('../facades/Facades');
const ServiceProvider = require('./ServiceProvider');
const Log = require('../log/Log');

class LogProvider extends ServiceProvider {
    /**
     *
     */
    register() {
    /**
         *
         * @type {Log}
         */
        facades.log = new Log();
    }

    /**
     *
     */
    boot() {
        facades.log.setConfig(facades.config.get('log', {}));
    }
}

module.exports = LogProvider;

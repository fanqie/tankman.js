const ServiceProvider = require('./ServiceProvider');
const Facades = require('../facades/Facades');
const ProcessInfo = require('../utils/ProcessInfo');


module.exports = class ProcessInfoProvider extends ServiceProvider {
    /**
         * register
         */
    register() {
    //
        Facades.processInfo = new ProcessInfo();
    }

    /**
         * boot
         */
    boot() {
    }

    constructor(app) {
        super(app);
    }
};

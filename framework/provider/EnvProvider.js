const facades = require('../facades/Facades');
const ServiceProvider = require('./ServiceProvider');
const Env = require('../config/Env');

class EnvProvider extends ServiceProvider {
    register() {
        facades.env = new Env();
    }

    boot() {
        facades.env.load();
    }

    constructor(app) {
        super(app);
    }
}

module.exports = EnvProvider;

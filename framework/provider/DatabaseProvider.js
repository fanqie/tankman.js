const ServiceProvider = require('./ServiceProvider');
const DbManager = require('../orm/DbManager.js');
const Facades = require('../facades/Facades');


class DatabaseProvider extends ServiceProvider {
    constructor(app) {
        super(app);
    }

    register() {
        const dbManager = new DbManager();

        Facades.db = dbManager.getDefault();
    }

    boot() {

    }
}

module.exports = DatabaseProvider;

const ServiceProvider = require("./ServiceProvider");
const DbManager = require("../orm/DbManager.js");
const Facades = require("../facades/Facades");
const Orm = require("../orm/Orm");


class DatabaseProvider extends ServiceProvider {
    constructor(app) {
        super(app);

    }

    register() {
        const dbManager = new DbManager()

        Facades.Db = dbManager.GetDefault()
    }

    boot() {

    }
}

module.exports = DatabaseProvider

const ServiceProvider = require("./ServiceProvider");
const DB = require("../orm/Db.js");
const Facades = require("../Facades")

class DatabaseProvider extends ServiceProvider {
    constructor(app) {
        super(app);

    }

    register() {
        Facades.DB = new DB()

    }

    boot() {
    }
}

module.exports = DatabaseProvider

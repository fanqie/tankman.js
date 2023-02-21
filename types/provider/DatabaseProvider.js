const ServiceProvider = require("./ServiceProvider");
const DB = require("../orm/Db.js");
const Facades = require("../facades/Facades");
class DatabaseProvider extends ServiceProvider {
    constructor(app) {
        super(app);
    }
    register() {
        Facades.Db = new DB();
    }
    boot() {
    }
}
module.exports = DatabaseProvider;

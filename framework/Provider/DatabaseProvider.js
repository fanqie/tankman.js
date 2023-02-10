const ServiceProvider = require("./ServiceProvider");
const Facades = require("../Facades");
const Orm = require("../Orm/Orm");
module.exports = class UpLoProvider extends ServiceProvider {
    register() {
        //
        Facades.Db = new Orm()
    }

    boot() {
    }
}

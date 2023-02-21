const Facades = require("../facades/Facades");
const ServiceProvider = require("./ServiceProvider");
const Config = require("../config/Config");
class ConfigProvider extends ServiceProvider {
    register() {
        Facades.Config = new Config();
    }
    boot() {
        Facades.Config.Load();
    }
}
module.exports = ConfigProvider;

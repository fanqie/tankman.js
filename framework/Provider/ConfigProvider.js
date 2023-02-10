const Facades = require("../Facades")
const ServiceProvider = require("./ServiceProvider");
const Env = require("../Config/Env")
module.exports = class ConfigProvider extends ServiceProvider {
    register() {
        Facades.Config = new Env()
    }

    boot() {
        Facades.Config.LoadEnv()
        Facades.Config.LoadConfig()
    }
}

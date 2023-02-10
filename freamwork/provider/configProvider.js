const Facades = require("../facades")
const ServiceProvider = require("./ServiceProvider");
const Environment = require("../config/environment")
module.exports = class ConfigProvider extends ServiceProvider {
    register() {
        Facades.Config = new Environment(Facades.ProcessInfo.Flags.get("--ENV"))
    }

    boot() {
    }
}

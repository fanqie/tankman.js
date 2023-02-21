const Facades = require("../facades/Facades");
const ServiceProvider = require("./ServiceProvider");
const Env = require("../config/Env");
class EnvProvider extends ServiceProvider {
    register() {
        Facades.Env = new Env();
    }
    boot() {
        Facades.Env.Load();
    }
}
module.exports = EnvProvider;

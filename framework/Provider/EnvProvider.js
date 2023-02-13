const Facades = require("../Facades")
const ServiceProvider = require("./ServiceProvider");
const Env = require("../Config/Env")
class EnvProvider extends ServiceProvider {
    register() {
        /**
         *
         * @type {Env}
         */
        Facades.Env = new Env()
    }

    boot() {
        Facades.Env.Load()
    }
}
module.exports = EnvProvider

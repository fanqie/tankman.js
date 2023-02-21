const Facades = require("../Facades")
const ServiceProvider = require("./ServiceProvider");
const Log = require("../log/Log");

class LogProvider extends ServiceProvider {
    /**
     *
     */
    register() {
        /**
         *
         * @type {Log}
         */
        Facades.Log = new Log()
    }

    /**
     *
     */
    boot() {
        Facades.Log.SetConfig(Facades.Config.Get("log", {}))
    }
}

module.exports = LogProvider

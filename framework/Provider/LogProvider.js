const Facades = require("../Facades")
const ServiceProvider = require("./ServiceProvider");
const Log = require("../Log/Log");
const {FC} = require("../Index");

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
        Facades.Log.SetConfig(FC.Config.Get("log", {}))
    }
}

module.exports = LogProvider

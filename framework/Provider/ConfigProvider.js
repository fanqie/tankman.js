const Facades = require("../Facades")
const ServiceProvider = require("./ServiceProvider");
const Config = require("../Config/Config")
 class ConfigProvider extends ServiceProvider {
     /**
      *
      */
    register() {
        Facades.Config = new Config()
    }

     /**
      *
      */
    boot() {
        Facades.Config.Load()
    }
}

module.exports = ConfigProvider

const ServiceProvider = require("./ServiceProvider");
const Facades = require("../Facades");
const UpLo = require("../UpLo/UpLo");
module.exports=class UpLoProvider extends ServiceProvider {
    register() {
        //
        Facades.UpLo = UpLo
    }

    boot() {
    }
}

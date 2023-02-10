const ServiceProvider = require("./serviceProvider");
const Facades = require("../facades");
const  ProcessInfo = require("../utils/ProcessInfo")
module.exports=class ProcessInfoProvider extends ServiceProvider {
    register() {
        //
        Facades.ProcessInfo = new ProcessInfo()
    }

    boot() {
    }
}

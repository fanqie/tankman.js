const ServiceProvider = require("./ServiceProvider");
const Facades = require("../Facades");
const  ProcessInfo = require("../Utils/ProcessInfo")
module.exports=class ProcessInfoProvider extends ServiceProvider {
    register() {
        //
        Facades.ProcessInfo = new ProcessInfo()
    }

    boot() {
    }
}

const ServiceProvider = require("./ServiceProvider");
const Facades = require("../Facades");
const ProcessInfo = require("../Utils/ProcessInfo")

/**
 *
 */
class ProcessInfoProvider extends ServiceProvider {
    /**
     * register
     */
    register() {
        //
        Facades.ProcessInfo = new ProcessInfo()
    }

    /**
     * boot
     */
    boot() {
    }
}

module.exports = ProcessInfoProvider

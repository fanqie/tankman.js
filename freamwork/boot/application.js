const path = require("path")
const providers = require("../provider/index")
const ProcessInfoProvider = require("../provider/processInfoProvider");

module.exports=class Application {
    constructor() {
        this.registerBaseServiceProviders()
        this.bootBaseServiceProviders()
    }

    boot() {
        this.registerConfiguredServiceProviders()
        this.bootConfiguredServiceProviders()

        this.bootTank()
        this.setRootPath()
    }

    registerBaseServiceProviders() {
        //init env config
        this.registerServiceProviders(this.getBaseServiceProviders())
    }

    bootBaseServiceProviders() {
        this.bootServiceProviders(this.getBaseServiceProviders())
    }

    registerConfiguredServiceProviders() {
        //get all provider and register
        this.registerServiceProviders(this.getConfiguredServiceProviders())
    }

    bootConfiguredServiceProviders() {
        this.registerServiceProviders(this.getConfiguredServiceProviders())
    }


    getConfiguredServiceProviders() {
        return []
    }

    setRootPath() {
        //:todo
    }

    bootTank() {

    }
    registerServiceProviders(serviceProviders) {

        for (const serviceProvider of serviceProviders) {

            serviceProvider.register()
        }
    }
    bootServiceProviders(serviceProviders) {
        for (const serviceProvider of serviceProviders) {
            serviceProvider.boot()
        }
    }

    getBaseServiceProviders() {
        return [new providers.ProcessInfoProvider(),new providers.ConfigProvider()]
    }
}

const path = require("path")
const ProcessInfoProvider = require("../Provider/ProcessInfoProvider");
const ConfigProvider = require("../Provider/ConfigProvider");
const {Facades} = require("../Index");

module.exports = class Application {
    constructor() {
        this.registerBaseServiceProviders()
        this.bootBaseServiceProviders()
        Facades.Config.LoadConfig()
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
        this.bootServiceProviders(this.getConfiguredServiceProviders())
    }


    getConfiguredServiceProviders() {
        console.log(Facades.Config.Config("app"))
        return Facades.Config.Config("app").providers.map((Class => {
            return new Class()
        }))
    }
    registerServiceProviders(serviceProviders) {
        console.log("serviceProviders",serviceProviders)
        serviceProviders.forEach(serviceProvider => {
            serviceProvider.register()
        })
    }

    bootServiceProviders(serviceProviders) {
        serviceProviders.forEach(serviceProvider => {
            serviceProvider.boot()
        })
    }

    setRootPath() {
        //:todo
    }

    bootTank() {

    }


    getBaseServiceProviders() {
        return [new ProcessInfoProvider(), new ConfigProvider()]
    }
}

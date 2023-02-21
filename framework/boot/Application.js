const ProcessInfoProvider = require("../provider/ProcessInfoProvider");
const ConfigProvider = require("../provider/ConfigProvider");
const EnvProvider = require("../provider/EnvProvider");
const {FC} = require("../Index");


/**
 *
 */
class Application {


    /**
     *
     */
    constructor() {
        this.registerBaseServiceProviders()
        this.bootBaseServiceProviders()
    }

    /**
     *
     */
    bootTank() {

        this.registerConfiguredServiceProviders();
        this.bootConfiguredServiceProviders();

        this.setRootPath();
    }

    /**
     *
     */
    registerBaseServiceProviders() {
        //init env config
        this.registerServiceProviders(this.getBaseServiceProviders())
    }

    /**
     *
     */
    bootBaseServiceProviders() {
        this.bootServiceProviders(this.getBaseServiceProviders())
    }

    /**
     *
     */
    registerConfiguredServiceProviders() {
        //get all provider and register
        this.registerServiceProviders(this.getConfiguredServiceProviders())
    }

    /**
     *
     */
    bootConfiguredServiceProviders() {
        this.bootServiceProviders(this.getConfiguredServiceProviders())
    }

    /**
     *
     * @return {ServiceProvider[]}
     */
    getConfiguredServiceProviders() {
        return FC.Config.Get("app").providers.map((Class => {
            return new Class(this)
        }))
    }

    /**
     *
     * @param {ServiceProvider[]}
     */
    registerServiceProviders(serviceProviders) {
        serviceProviders.forEach(serviceProvider => {
            serviceProvider.register()
        })
    }

    /**
     *
     * @param {ServiceProvider[]}
     */
    bootServiceProviders(serviceProviders) {
        serviceProviders.forEach(serviceProvider => {
            serviceProvider.boot()
        })

    }

    /**
     *
     */
    setRootPath() {
        //:todo
    }
    /**
     * use case
     * @param fun {Function}
     * @return {Application}
     * @public
     */
    Use(fun){
        fun.apply(this)
        return this
    }
    /**
     *
     * @return {ServiceProvider[]}
     */
    getBaseServiceProviders() {
        return [new ProcessInfoProvider(this), new EnvProvider(this), new ConfigProvider(this)]
    }
}

module.exports = Application

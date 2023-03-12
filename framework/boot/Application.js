const Facades = require("../facades/Facades");
const ProcessInfoProvider = require("../provider/ProcessInfoProvider");
const ConfigProvider = require("../provider/ConfigProvider");
const EnvProvider = require("../provider/EnvProvider");
const Command = require("../command/Command");
const ServiceProvider = require("../provider/ServiceProvider");
const FacadesClass = require("../facades/FacadesClass");


/**
 *
 */
class Application {
    /**
     *
     * @type FacadesClass
     */
    Facades
    /**
     *
     * @type {Map<string,Command>}
     */
    commandHandles = new Map()

    /**
     *
     */
    constructor() {
        this._registerBaseServiceProviders();
        this._bootBaseServiceProviders()

    }


    /**
     * @public
     */
    bootTank() {

        this._registerConfiguredServiceProviders();
        this._bootConfiguredServiceProviders();

        this._registerConfiguredCommands()
        this._setRootPath();
        this._linkFacades()
    }

    /**
     * @private
     */
    _linkFacades() {
        Facades.App = this
        this.Facades = Facades
    }


    /**
     * @private
     */
    _registerBaseServiceProviders() {
        //init env config
        this._registerServiceProviders(this._getBaseServiceProviders())
    }

    /**
     * @private
     */
    _bootBaseServiceProviders() {
        this._bootServiceProviders(this._getBaseServiceProviders())
    }

    /**
     * @private
     */
    _registerConfiguredServiceProviders() {
        //get all provider and register
        this._registerServiceProviders(this._getConfiguredServiceProviders())
    }

    /**
     *
     * @private
     */
    _bootConfiguredServiceProviders() {
        this._bootServiceProviders(this._getConfiguredServiceProviders())
    }

    /**
     * @private
     */
    _registerConfiguredCommands() {
        this._registerCommands(this._getConfiguredCommands())

    }

    /**
     *
     * @return {*[]}
     * @private
     */
    _getConfiguredServiceProviders() {
        return Facades.Config.Get("app").providers.map((Class => {
            return new Class(this)
        }))
    }

    /**
     *
     * @return {*|Command[]}
     * @private
     */
    _getConfiguredCommands() {
        return Facades.Config.Get("app").commands.map((Class => {
            return new Class(this)
        }))
    }

    /**
     * @param serviceProviders
     */
    _registerServiceProviders(serviceProviders) {
        serviceProviders.forEach(serviceProvider => {
            serviceProvider.register()
        })
    }

    /**
     * @param commands
     * @private
     */
    _registerCommands(commands) {

        commands.forEach(commandInstance => {
            commandInstance.register(this.commandHandles)
            commandInstance.boot()
        })
    }

    /**
     *
     * @param serviceProviders {ServiceProvider[]}
     * @private
     */
    _bootServiceProviders(serviceProviders) {
        serviceProviders.forEach(serviceProvider => {
            serviceProvider.boot()
        })

    }

    /**
     *
     * @private
     */
    _setRootPath() {
        //:todo
    }

    /**
     * use case
     * @param fun {Function}
     * @return {Application}
     * @public
     */
    use(fun) {
        fun.apply(this);
        return this
    }

    /**
     *
     * @return {ServiceProvider[]}
     * @private
     */
    _getBaseServiceProviders() {

        return [new ProcessInfoProvider(this), new EnvProvider(this), new ConfigProvider(this)]
    }
}

module.exports = Application;

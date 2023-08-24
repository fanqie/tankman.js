const Facades = require('../facades/Facades');
const Command = require('../command/Command');
const ServiceProvider = require('../provider/ServiceProvider');
const FacadesClass = require('../facades/FacadesClass');
const Controller = require('../http/controller/Controller');
const ProviderFactory = require('../factor/ProviderFactory');

/**
 *
 */
class Application {
    /**
     *
     * @type FacadesClass
     */
    facades;
    /**
     *
     * @type {Map<string,Command>}
     */
    commandHandles = new Map();
    rootPath = './';
    _configs = {};
    constructor(configs) {
        Facades.app = this;

        this._registerBaseServiceProviders();

        this._bootBaseServiceProviders();
        this._registerBeforeBootServiceProviders();
    }

    _beforeBoot() {
        this._registerBeforeBootServiceProviders();
        this._bootBeforeBootServiceProviders();
    }

    _registerBeforeBootServiceProviders() {
        this._registerServiceProviders(this._getBeforeBootServiceProviders());
    }

    _bootBeforeBootServiceProviders() {
        this._bootServiceProviders(this._getBeforeBootServiceProviders());
    }

    _getBeforeBootServiceProviders() {
        return [ProviderFactory.make(require('../provider/ConfigProvider'), this)];
    }

    _getConfigs() {
        return this._configs;
    }

    /**
     * boot app and register all service providers
     * @param {{}[]} configs
     */
    boot(configs) {
        this._configs = configs;
        this._beforeBoot();
        this._registerConfiguredServiceProviders();
        this._bootConfiguredServiceProviders();

        this._registerConfiguredCommands();
        this._setRootPath();
        this._linkFacades();
    }

    /**
     * @private
     */
    _linkFacades() {
        this.facades = Facades;
    }


    /**
     * @private
     */
    _registerBaseServiceProviders() {
        // init env config
        this._registerServiceProviders(this._getBaseServiceProviders());
    }

    /**
     * @private
     */
    _bootBaseServiceProviders() {
        this._bootServiceProviders(this._getBaseServiceProviders());
    }

    /**
     * @private
     */
    _registerConfiguredServiceProviders() {
        // get all provider and register
        this._registerServiceProviders(this._getConfiguredServiceProviders());
    }

    /**
     *
     * @private
     */
    _bootConfiguredServiceProviders() {
        this._bootServiceProviders(this._getConfiguredServiceProviders());
    }

    /**
     * @private
     */
    _registerConfiguredCommands() {
        this._registerCommands(this._getConfiguredCommands());
    }

    /**
     *
     * @return {*[]}
     * @private
     */
    _getConfiguredServiceProviders() {
        return Facades.config.get('kernel').providers.map(((ctor) => {
            return new ctor(this);
        }));
    }

    /**
     *
     * @return {*|Command[]}
     * @private
     */
    _getConfiguredCommands() {
        return Facades.config.get('kernel').commands.map(((ctor) => {
            return new ctor(this);
        }));
    }

    /**
     * @param {ServiceProvider[]} serviceProviders
     */
    _registerServiceProviders(serviceProviders) {
        serviceProviders.forEach((serviceProvider) => {
            serviceProvider.register();
        });
    }

    /**
     * @param {Command[]}commands
     * @private
     */
    _registerCommands(commands) {
        commands.forEach((commandInstance) => {
            commandInstance.register(this.commandHandles);
            commandInstance.boot();
        });
    }

    /**
     *
     * @param {ServiceProvider[]} serviceProviders
     * @private
     */
    _bootServiceProviders(serviceProviders) {
        serviceProviders.forEach((serviceProvider) => {
            serviceProvider.boot();
        });
    }

    /**
     * @private
     */
    _setRootPath() {
        this.rootPath = process.cwd();
    }

    /**
     * get run app at root path
     * @return {string}
     */
    getRootPath() {
        return this.rootPath;
    }

    /**
     * use case
     * @param {Function} fun
     * @return {Application}
     * @public
     */
    use(fun) {
        fun.apply(this);
        return this;
    }

    /**
     *
     * @return {ServiceProvider[]}
     * @private
     */
    _getBaseServiceProviders() {
        return [ProviderFactory.make(require('../provider/ProcessInfoProvider'), this), ProviderFactory.make(require('../provider/EnvProvider'), this)];
    }


}

module.exports = Application;

const Facades = require('../facades/Facades');
const ProcessInfoProvider = require('../provider/ProcessInfoProvider');
const ConfigProvider = require('../provider/ConfigProvider');
const EnvProvider = require('../provider/EnvProvider');
const Command = require('../command/Command');
const ServiceProvider = require('../provider/ServiceProvider');
const FacadesClass = require('../facades/FacadesClass');
const Controller = require('../http/controller/Controller');

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

    /**
     *
     */
    constructor() {
        Facades.app = this;
        this._registerBaseServiceProviders();
        this._bootBaseServiceProviders();
    }


    /**
     * @public
     */
    bootTank() {
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
        return Facades.config.get('app').providers.map(((Class) => {
            return new Class(this);
        }));
    }

    /**
     *
     * @return {*|Command[]}
     * @private
     */
    _getConfiguredCommands() {
        return Facades.config.get('app').commands.map(((Class) => {
            return new Class(this);
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
        return [new ProcessInfoProvider(this), new EnvProvider(this), new ConfigProvider(this)];
    }

    /**
     *
     * @type {Map<string,any>}
     */
    singletonItems = new Map();

    /**
     *
     * @param {*} Source
     * @param {string} [alisa='']
     * @return {Source|Controller|*}
     * @function
     */
    singleton(Source, alisa = '') {
        if (!/^class\s/.test(Object.valueOf.toString.call(Source))) {
            throw new Error('is not a construction class');
        }
        if (!alisa) {
            alisa = Source.name;
        }
        if (!this.singletonItems.has(alisa)) {
            this.singletonItems.set(alisa, new Source());
        }

        return this.singletonItems.get(alisa);
    }
}

module.exports = Application;

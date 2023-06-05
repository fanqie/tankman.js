export = Application;
/**
 *
 */
declare class Application {
    /**
     *
     * @type FacadesClass
     */
    facades: FacadesClass;
    /**
     *
     * @type {Map<string,Command>}
     */
    commandHandles: Map<string, Command>;
    rootPath: string;
    /**
     * @public
     */
    public bootTank(): void;
    /**
     * @private
     */
    private _linkFacades;
    /**
     * @private
     */
    private _registerBaseServiceProviders;
    /**
     * @private
     */
    private _bootBaseServiceProviders;
    /**
     * @private
     */
    private _registerConfiguredServiceProviders;
    /**
     *
     * @private
     */
    private _bootConfiguredServiceProviders;
    /**
     * @private
     */
    private _registerConfiguredCommands;
    /**
     *
     * @return {*[]}
     * @private
     */
    private _getConfiguredServiceProviders;
    /**
     *
     * @return {*|Command[]}
     * @private
     */
    private _getConfiguredCommands;
    /**
     * @param {ServiceProvider[]} serviceProviders
     */
    _registerServiceProviders(serviceProviders: ServiceProvider[]): void;
    /**
     * @param {Command[]}commands
     * @private
     */
    private _registerCommands;
    /**
     *
     * @param {ServiceProvider[]} serviceProviders
     * @private
     */
    private _bootServiceProviders;
    /**
     * @private
     */
    private _setRootPath;
    /**
     * get run app at root path
     * @return {string}
     */
    getRootPath(): string;
    /**
     * use case
     * @param {Function} fun
     * @return {Application}
     * @public
     */
    public use(fun: Function): Application;
    /**
     *
     * @return {ServiceProvider[]}
     * @private
     */
    private _getBaseServiceProviders;
}
import FacadesClass = require("../facades/FacadesClass");
import Command = require("../command/Command");
import ServiceProvider = require("../provider/ServiceProvider");

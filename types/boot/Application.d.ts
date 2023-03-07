export = Application;
/**
 *
 */
declare class Application {
    /**
     *
     * @type FacadesClass
     */
    Facades: FacadesClass;
    _register(): void;
    /**
     *
     */
    bootTank(): void;
    /**
     *
     */
    registerBaseServiceProviders(): void;
    /**
     *
     */
    bootBaseServiceProviders(): void;
    /**
     *
     */
    registerConfiguredServiceProviders(): void;
    /**
     *
     */
    bootConfiguredServiceProviders(): void;
    /**
     *
     * @return {*[]}
     */
    getConfiguredServiceProviders(): any[];
    /**
     *
     * @param serviceProviders
     */
    registerServiceProviders(serviceProviders: any): void;
    /**
     *
     * @param serviceProviders {ServiceProvider[]}
     */
    bootServiceProviders(serviceProviders: ServiceProvider[]): void;
    /**
     *
     */
    setRootPath(): void;
    /**
     * use case
     * @param fun {Function}
     * @return {Application}
     * @public
     */
    public Use(fun: Function): Application;
    /**
     *
     * @return {ServiceProvider[]}
     */
    getBaseServiceProviders(): ServiceProvider[];
}
import FacadesClass = require("../facades/FacadesClass");
import ServiceProvider = require("../provider/ServiceProvider");

export = Application;
/**
 *
 */
declare class Application {
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
import ServiceProvider = require("../provider/ServiceProvider");

export = ControllerSingletonFactory;
/**
 * A factory for creating and managing singleton instances of controller classes.
 */
declare class ControllerSingletonFactory {
    /**
     * A map of controller instances, keyed by alias or controller classpath.
     * @type {Map<string, Controller>}
     * @private
     */
    private static _controllerInstances;
    /**
     * Creates a singleton instance of the specified controller class and returns it.
     * @param {string} controllerClasspath - The path to the controller class.
     * @param {string} [alias=""] - An optional alias for the controller instance.
     * @returns {Controller} - The controller instance, or null if an error occurred.
     */
    static make(controllerClasspath: string, alias?: string): Controller;
    /**
     * Clears the cache of controller instances.
     */
    static clearCache(): void;
    /**
     * Deletes the singleton instance of the specified controller class.
     * @param {string} controllerClasspath - The path to the controller class.
     * @returns {boolean} - true if the instance was deleted, false otherwise.
     */
    static deleteInstance(controllerClasspath: string): boolean;
    /**
     * Returns an array of all singleton instances of controller classes.
     * @returns {Controller[]} - An array of controller instances.
     */
    static getAllInstances(): Controller[];
}
import Controller = require("../http/controller/Controller");

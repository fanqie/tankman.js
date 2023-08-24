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
     * @param {function(new:Controller)} ctor - The path to the controller class.
     * @returns {Controller} - The controller instance, or null if an error occurred.
     */
    static make(ctor: new () => Controller): Controller;
    static md5Key(ctor: any): string;
    /**
     * Clears the cache of controller instances.
     */
    static clearCache(): void;
    /**
     * Deletes the singleton instance of the specified controller class.
     * @param {function(new:Controller)} ctor - The path to the controller class. the controller class.
     * @returns {boolean} - true if the instance was deleted, false otherwise.
     */
    static deleteInstance(ctor: new () => Controller): boolean;
    static instanceExists(ctor: any): boolean;
    static has(ctor: any): boolean;
    /**
     * Returns an array of all singleton instances of controller classes.
     * @returns {Controller[]} - An array of controller instances.
     */
    static getAllInstances(): Controller[];
}
import Controller = require("../http/controller/Controller");

export = SingletonFactory;
/**
 * A factory class for creating singleton instances of JavaScript classes.
 * @class
 */
declare class SingletonFactory {
    /**
     * A map of class instances, keyed by class name or alias.
     * @static
     * @private
     * @type {Map<string, *>}
     */
    private static _instances;
    /**
     * Creates a singleton instance of the specified class.
     * @static
     * @param {string} cls - The name or path of the class to create an instance of.
     * @param {string} [alias=""] - An optional alias to use as the key in the instance map.
     * @returns {*} The singleton instance of the class, or null if an error occurred.
     */
    static make(cls: string, alias?: string): any;
    /**
     * Clears the instance cache.
     * @static
     */
    static clearCache(): void;
    /**
     * Deletes the singleton instance of the specified class.
     * @static
     * @param {string} cls - The name or path of the class to delete the instance of.
     * @returns {boolean} true if the instance was deleted, false otherwise.
     */
    static deleteInstance(cls: string): boolean;
    /**
     * Returns an array of all singleton instances.
     * @static
     * @returns {Array<*>} An array of all singleton instances.
     */
    static getAllInstances(): Array<any>;
}

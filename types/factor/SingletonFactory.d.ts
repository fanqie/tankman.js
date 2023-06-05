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
     * @template T
     * @param {function(new:any)} ctor - The name or path of the class to create an instance of.
     * @param {*[]} args
     * @returns {any} The singleton instance of the class, or null if an error occurred.
     */
    static make<T>(ctor: new () => any, ...args: any[]): any;
    static md5Key(ctor: any): string;
    /**
     * Clears the instance cache.
     * @static
     */
    static clearCache(): void;
    /**
     * Deletes the singleton instance of the specified class.
     * @static
     * @param {function(new:Function)} ctor - The name or path of the class to create an instance of.
     * @returns {boolean} true if the instance was deleted, false otherwise.
     */
    static deleteInstance(ctor: new () => Function): boolean;
    static instanceExists(ctor: any): boolean;
    static has(ctor: any): boolean;
    /**
     * Returns an array of all singleton instances.
     * @static
     * @returns {Array<*>} An array of all singleton instances.
     */
    static getAllInstances(): Array<any>;
}

/**
 * A factory class for creating singleton instances of JavaScript classes.
 * @class
 */
class SingletonFactory {
    /**
     * A map of class instances, keyed by class name or alias.
     * @static
     * @private
     * @type {Map<string, *>}
     */
    static _instances = new Map();

    /**
     * Creates a singleton instance of the specified class.
     * @static
     * @param {string} cls - The name or path of the class to create an instance of.
     * @param {string} [alias=""] - An optional alias to use as the key in the instance map.
     * @returns {*} The singleton instance of the class, or null if an error occurred.
     */
    static make(cls, alias = "") {
        const key = alias || require.resolve(cls);
        if (this._instances.has(key)) {
            return this._instances.get(key);
        }
        try {
            const instance = new (require(cls))();
            this._instances.set(key, instance);
            return instance;
        } catch (err) {
            throw new Error(`Error creating singleton for ${cls}: ${err.message}`);
        }
    }

    /**
     * Clears the instance cache.
     * @static
     */
    static clearCache() {
        this._instances.clear();
    }

    /**
     * Deletes the singleton instance of the specified class.
     * @static
     * @param {string} cls - The name or path of the class to delete the instance of.
     * @returns {boolean} true if the instance was deleted, false otherwise.
     */
    static deleteInstance(cls) {
        const key = require.resolve(cls);
        return this._instances.delete(key);
    }
    /**
     * Returns an array of all singleton instances.
     * @static
     * @returns {Array<*>} An array of all singleton instances.
     */
    static getAllInstances() {
        return Array.from(this._instances.values());
    }
}

module.exports = SingletonFactory;

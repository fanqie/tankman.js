const crypto = require('crypto');

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
     * @template T
     * @param {function(new:any)} ctor - The name or path of the class to create an instance of.
     * @param {*[]} args
     * @returns {any} The singleton instance of the class, or null if an error occurred.
     */
    static make(ctor, ...args) {
        const key = this.md5Key(ctor);
        if (this._instances.has(key)) {
            return this._instances.get(key);
        }
        try {
            const instance = Reflect.construct(ctor, [...args])
            this._instances.set(key, instance);
            return instance;
        } catch (err) {
            throw new Error(`Error creating singleton for ${ctor}: ${err.message}`);
        }
    }

    static md5Key(ctor) {
        const hash = crypto.createHash('sha256');
        hash.update(ctor.toString());
        return hash.digest('hex');
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
     * @param {function(new:Function)} ctor - The name or path of the class to create an instance of.
     * @returns {boolean} true if the instance was deleted, false otherwise.
     */
    static deleteInstance(ctor) {
        const key = this.md5Key(ctor);
        return this._instances.delete(key);
    }

    static instanceExists(ctor) {
        const key = this.md5Key(ctor);
        return this._instances.has(key);
    }

    static has(ctor) {
        const key = this.md5Key(ctor);
        return this._instances.has(key);
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

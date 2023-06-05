const ServiceProvider = require("../provider/ServiceProvider");
const crypto = require("crypto");
const Application = require("../boot/Application");

/**
 * A factory for creating and managing singleton instances of controller classes.
 */
class ProviderFactory {
    /**
     * A map of controller instances, keyed by alias or controller classpath.
     * @type {Map<string, ServiceProvider>}
     * @private
     */
    static _providerInstances = new Map();

    /**
     * Creates a singleton instance of the specified provider class and returns it.
     * @param {function(new:ServiceProvider)} ctor - The path to the controller class.
     * @param {Application} app - The application instance.
     * @returns {ServiceProvider} - The controller instance, or null if an error occurred.
     */
    static make(ctor,app) {
        const key = this.md5Key(ctor);
        if (this._providerInstances.has(key)) {
            return this._providerInstances.get(key);
        }
        try {
            const instance = Reflect.construct(ctor, [app])

            this._providerInstances.set(key, instance);
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
     * Clears the cache of controller instances.
     */
    static clearCache() {
        this._providerInstances.clear();
    }

    /**
     * Deletes the singleton instance of the specified controller class.
     * @param {function(new:ServiceProvider)} ctor - The path to the controller class. the controller class.
     * @returns {boolean} - true if the instance was deleted, false otherwise.
     */
    static deleteInstance(ctor) {
        const key = this.md5Key(ctor);
        return this._providerInstances.delete(key);
    }

    static instanceExists(ctor) {
        const key = this.md5Key(ctor);
        return this._providerInstances.has(key);
    }

    static has(ctor) {
        const key = this.md5Key(ctor);
        return this._providerInstances.has(key);
    }

    /**
     * Returns an array of all singleton instances of controller classes.
     * @returns {ServiceProvider[]} - An array of controller instances.
     */
    static getAllInstances() {
        return Array.from(this._providerInstances.values());
    }
}

module.exports = ProviderFactory;

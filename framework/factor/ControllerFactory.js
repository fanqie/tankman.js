const Controller = require("../http/controller/Controller");
const crypto = require("crypto");
const Application = require("../boot/Application");

/**
 * A factory for creating and managing singleton instances of controller classes.
 */
class ControllerFactory {
    /**
     * A map of controller instances, keyed by alias or controller classpath.
     * @type {Map<string, Controller>}
     * @private
     */
    static _controllerInstances = new Map();

    /**
     * Creates a singleton instance of the specified controller class and returns it.
     * @param {function(new:Controller)} ctor - The path to the controller class.
     * @param {Application} app - The application instance.
     * @returns {Controller} - The controller instance, or null if an error occurred.
     */
    static make(ctor, app) {
        const key = this.md5Key(ctor);
        if (this._controllerInstances.has(key)) {
            return this._controllerInstances.get(key);
        }
        try {
            const instance = Reflect.construct(ctor, [app])

            this._controllerInstances.set(key, instance);
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
        this._controllerInstances.clear();
    }

    /**
     * Deletes the singleton instance of the specified controller class.
     * @param {function(new:Controller)} ctor - The path to the controller class. the controller class.
     * @returns {boolean} - true if the instance was deleted, false otherwise.
     */
    static deleteInstance(ctor) {
        const key = this.md5Key(ctor);
        return this._controllerInstances.delete(key);
    }

    static instanceExists(ctor) {
        const key = this.md5Key(ctor);
        return this._controllerInstances.has(key);
    }

    static has(ctor) {
        const key = this.md5Key(ctor);
        return this._controllerInstances.has(key);
    }

    /**
     * Returns an array of all singleton instances of controller classes.
     * @returns {Controller[]} - An array of controller instances.
     */
    static getAllInstances() {
        return Array.from(this._controllerInstances.values());
    }
}

module.exports = ControllerFactory;

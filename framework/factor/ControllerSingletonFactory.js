const Controller = require("../http/controller/Controller");

/**
 * A factory for creating and managing singleton instances of controller classes.
 */
class ControllerSingletonFactory {
    /**
     * A map of controller instances, keyed by alias or controller classpath.
     * @type {Map<string, Controller>}
     * @private
     */
    static _controllerInstances = new Map();

    /**
     * Creates a singleton instance of the specified controller class and returns it.
     * @param {string} controllerClasspath - The path to the controller class.
     * @param {string} [alias=""] - An optional alias for the controller instance.
     * @returns {Controller} - The controller instance, or null if an error occurred.
     */
    static make(controllerClasspath, alias = "") {
        const key = alias || require.resolve(controllerClasspath);
        if (this._controllerInstances.has(key)) {
            return this._controllerInstances.get(key);
        }
        try {
            const controllerInstance = new (require(controllerClasspath))();
            this._controllerInstances.set(key, controllerInstance);
            return controllerInstance;
        } catch (err) {
            throw new Error(`Error creating singleton for ${controllerClasspath}: ${err.message}`)
        }
    }

    /**
     * Clears the cache of controller instances.
     */
    static clearCache() {
        this._controllerInstances.clear();
    }

    /**
     * Deletes the singleton instance of the specified controller class.
     * @param {string} controllerClasspath - The path to the controller class.
     * @returns {boolean} - true if the instance was deleted, false otherwise.
     */
    static deleteInstance(controllerClasspath) {
        const key = require.resolve(controllerClasspath);
        return this._controllerInstances.delete(key);
    }

    /**
     * Returns an array of all singleton instances of controller classes.
     * @returns {Controller[]} - An array of controller instances.
     */
    static getAllInstances() {
        return Array.from(this._controllerInstances.values());
    }
}

module.exports = ControllerSingletonFactory;

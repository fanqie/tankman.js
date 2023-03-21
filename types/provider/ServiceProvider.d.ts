export = ServiceProvider;
/**
 * @abstract
 */
declare class ServiceProvider {
    /**
     *
     * @param {Application} app
     * @abstract
     */
    constructor(app: Application);
    /**
   * @type {Application}
   */
    app: Application;
    /**
     * @abstract
     */
    register(): void;
    /**
     * @abstract
     */
    boot(): void;
}
import Application = require("../boot/Application");

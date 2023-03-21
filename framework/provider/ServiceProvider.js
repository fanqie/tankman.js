const Application = require('../boot/Application');

/**
 * @abstract
 */
class ServiceProvider {
    /**
   * @type {Application}
   */
    app;

    /**
     *
     * @param {Application} app
     * @abstract
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * @abstract
     */
    register() {

    }

    /**
     * @abstract
     */
    boot() {
    }
}

module.exports = ServiceProvider;

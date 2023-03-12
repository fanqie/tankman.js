/**
 * @abstract
 */
class  ServiceProvider {
    app

    /**
     *
     * @param app
     * @abstract
     */
    constructor(app) {
        this.app = app
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

module.exports = ServiceProvider

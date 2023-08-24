const Facades = require('../facades/Facades');
const ServiceProvider = require('./ServiceProvider');
const Xss = require('../http/Xss');

class XssProvider extends ServiceProvider {
    /**
     *
     */
    register() {
    /**
         *
         * @type Xss
         */
        Facades.xss = new Xss();
    }

    /**
     *
     */
    boot() {
    }
}

module.exports = XssProvider;

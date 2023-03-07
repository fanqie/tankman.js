const Facades = require("../facades/Facades")
const ServiceProvider = require("./ServiceProvider");
const Xss = require("../http/Xss");

class XssProvider extends ServiceProvider {
    /**
     *
     */
    register() {
        /**
         *
         * @type Xss
         */
        Facades.Xss = new Xss()
    }

    /**
     *
     */
    boot() {
    }
}

module.exports = XssProvider;

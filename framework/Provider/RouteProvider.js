const ServiceProvider = require("./ServiceProvider")
const Route = require("../Route/Route")
const {FC} = require("../Index");

class RouteProvider extends ServiceProvider {
    /**
     *
     */
    register() {
        /**
         *
         * @type {Route}
         */
        FC.Route = new Route(this.app)
    }

    /**
     *
     */
    boot() {
        FC.Route.LoadSet()
    }
}

module.exports = RouteProvider

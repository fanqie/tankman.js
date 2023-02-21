const ServiceProvider = require("./ServiceProvider")
const Route = require("../route/Route")
const LoadRouters = require("../route/LoadRouters")
const Facades = require("../Facades");

class RouteProvider extends ServiceProvider {
    /**
     *
     */
    register() {
        /**
         *
         * @type {Route}
         */
        Facades.Route = new Route(this.app)
    }

    /**
     *
     */
    boot() {
        LoadRouters.Load(Facades.Config.Get("APP_ROUTES_DIR","routes"))
        Facades.Route.LoadSet()
    }
}

module.exports = RouteProvider

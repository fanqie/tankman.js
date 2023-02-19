const ServiceProvider = require("./ServiceProvider")
const Route = require("../route/Route")
const LoadRouters = require("../route/LoadRouters")
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
        LoadRouters.Load(FC.Config.Get("APP_ROUTES_DIR","routes"))
        FC.Route.LoadSet()
    }
}

module.exports = RouteProvider

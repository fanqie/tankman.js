const ServiceProvider = require("./ServiceProvider")
const Route = require("../Route/Route")
const {FC} = require("../Index");
class RouteProvider extends ServiceProvider {
    /**
     *
     */
    register() {
        FC.Route = new Route(this.app)
    }

    /**
     *
     */
    boot() {
    }
}
module.exports = RouteProvider

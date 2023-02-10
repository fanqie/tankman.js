const ServiceProvider = require("./ServiceProvider")
const Route = require("../Route/Route")
module.exports = class RouteProvider extends ServiceProvider {

    register() {
        return new Route(this.app)
    }

    boot() {
    }
}

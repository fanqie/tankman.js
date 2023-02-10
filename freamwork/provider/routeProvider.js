const provider = require("./index")
const Route = require("../route/route")
module.exports = class ServiceProvider extends provider.ServiceProvider {

    register() {
        return new Route(this.app)
    }

    boot() {
    }
}

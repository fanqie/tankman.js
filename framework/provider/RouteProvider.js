const ServiceProvider = require('./ServiceProvider');
const Route = require('../route/Route');
const LoadRouters = require('../route/LoadRouters');
const facades = require('../facades/Facades');

class RouteProvider extends ServiceProvider {
    /**
     *
     */
    register() {
        /**
         *
         * @type {Route}
         */
        facades.route = new Route();
    }

    /**
     *
     */
    boot() {
        // LoadRouters.load(facades.config.get('APP_ROUTES_DIR', 'routes'));
        // facades.route.loadSet();
    }
    setup() {
        // LoadRouters.load(facades.config.get('APP_ROUTES_DIR', 'routes'));
        facades.route.loadSet();
    }
}

module.exports = RouteProvider;

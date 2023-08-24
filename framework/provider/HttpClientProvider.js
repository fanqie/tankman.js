const Facades = require('../facades/Facades');
const ServiceProvider = require('./ServiceProvider');
const HttpClient = require('../httpClient/HttpClient');

class HttpClientProvider extends ServiceProvider {
    /**
     *
     */
    register() {
        /**
         *
         * @type HttpClient
         */
        Facades.httpClient = new HttpClient();
    }

    /**
     *
     */
    boot() {
    }
}

module.exports = HttpClientProvider;

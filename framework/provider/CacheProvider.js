const facades = require('../facades/Facades');
const ServiceProvider = require('./ServiceProvider');
const Config = require('../config/Config');
const FileCacheAdapter = require("../cache/adapter/FileCacheAdapter");

class CacheProvider extends ServiceProvider {
    /**
     * register provider
     */
    register() {
        facades.cache = facades.config.get("cache", new FileCacheAdapter(facades.env.get("CACHE_DRIVE", ".runtime/cache.json")));
    }

    /**
     * bootstrap provider
     */
    boot() {
    }
}

module.exports = CacheProvider;

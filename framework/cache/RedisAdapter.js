const CacheAbstract = require('./CacheAbstract');
const TankCache = require('tank-cache');
const path = require("path");
class RedisAdapter extends CacheAbstract {

    /**
     * @param {string} savePath
     */
    constructor(savePath=path.join(process.cwd(), ".runtime","cache")) {
        super();
        this.cache = new TankCache(savePath);
    }

    /**
     *
     * @param {string} key
     * @return {boolean}
     */
    has(key) {
        return this.cache.has(key);
    }

    /**
     * get Retrieve an item from the cache by key.
     * @param {string} key
     * @param {*} defaultVal
     * @return {string|null}
     * @Function
     */
    get(key, defaultVal = null) {
        return this.cache.get(key, defaultVal);
    }

    /**
     *
     * @param {string} key
     * @param {*} val
     */
    forever(key, val) {
        this.cache.forever(key, val);
    }

    /**
     * forget remove an item from the cache.
     * @param {string} key
     * @return {null|*}
     * @Function
     */
    forget(key) {
        return this.cache.forget(key);
    }

    /**
     * pull Retrieve an item from the cache and delete it.
     * @param {string} key
     * @return {*}
     * @Function
     */
    pull(key) {
        return this.cache.pull(key);
    }


    /**
     * set store an item in the cache for a given number of seconds.
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @return {void}
     * @Function
     */
    store(key, val = null, ttl = 0) {
        this.cache.store(key, val, ttl);
    }

    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @return {void}
     * @Function
     */
    set(key, val = null, ttl = 0) {
        this.cache.store(key, val, ttl);
    }

    /**
     * The add method will only store data that does not exist in the cache. If the storage is successful,
     * it will return true, otherwise it will return false:
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @return {void}
     * @Function
     */
    add(key, val = null, ttl = 0) {
        this.cache.add(key, val, ttl);
    }

    /**
     * clear cache
     * @Function
     */
    flush() {
        this.cache.flush();
    }
}
module.exports = RedisAdapter

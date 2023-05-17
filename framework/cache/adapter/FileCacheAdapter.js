const CacheAbstract = require('../CacheAbstract');
const TankCache = require('tank-cache');
const path = require("path");

class FileCacheAdapter extends CacheAbstract {
    handle = null;

    /**
     * @param {string} savePath
     */
    constructor(savePath = path.join(process.cwd(), ".runtime", "cache")) {
        super();
        /**
         * @type {TankCache}
         */
        this.handle = new TankCache(savePath);
    }

    /**
     *
     * @param {string} key
     * @return {Promise<boolean>}
     */
    has(key) {
        return new Promise(resolve => {
            resolve(this.handle.has(key))
        });
    }

    /**
     * get Retrieve an item from the cache by key.
     * @param {string} key
     * @param {string|number|null} defaultVal
     * @return {Promise<*>}
     * @Function
     */
    get(key, defaultVal = null) {
        return new Promise(resolve => {
            resolve(this.handle.get(key, defaultVal))
        });
    }

    /**
     *
     * @param {string} key
     * @param {string|number|null} val
     * @return {Promise<void>}
     */
    forever(key, val) {
        return new Promise(resolve => {
            resolve(this.handle.forever(key, val))
        });
    }

    /**
     * forget remove an item from the cache.
     * @param {string} key
     * @return {Promise<*>}
     * @Function
     */
    forget(key) {
        return new Promise(resolve => {
            resolve(this.handle.forget(key))
        });
    }

    /**
     * pull Retrieve an item from the cache and delete it.
     * @param {string} key
     * @return {Promise<*>}
     * @Function
     */
    pull(key) {
        return new Promise(resolve => {
            resolve(this.handle.pull(key))
        });
    }


    /**
     * set store an item in the cache for a given number of seconds.
     * @param {string} key
     * @param {string|number|null} val
     * @param {number} ttl Second
     * @return {Promise<void>}
     * @Function
     */
    store(key, val = null, ttl = 0) {
        return new Promise(resolve => {
            resolve(this.handle.store(key, val, ttl))
        });
    }

    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param {string} key
     * @param {string|number|null} val
     * @param {number} ttl Second
     * @return {Promise<void>}
     * @Function
     */
    set(key, val = null, ttl = 0) {
        return new Promise(resolve => {
            resolve(this.handle.store(key, val, ttl))
        });
    }

    /**
     * The add method will only store data that does not exist in the cache. If the storage is successful,
     * it will return true, otherwise it will return false:
     * @param {string} key
     * @param {string|number|null} val
     * @param {number} ttl Second
     * @return {Promise<void>}
     * @Function
     */
    add(key, val = null, ttl = 0) {
        return new Promise(resolve => {
            resolve(this.handle.add(key, val, ttl))
        });
    }

    /**
     * clear cache
     *@return {Promise<void>}
     */
    flush() {
        return new Promise(resolve => {
            resolve(this.handle.flush())
        })
    }

    /**
     * setTtl set the ttl of the key
     * @param  {string} key
     * @param {number} ttl   second
     * @return {Promise<void>}
     */
    setTtl(key, ttl) {
        return new Promise(resolve => {
            resolve(this.handle.ttl(key, ttl))
        })
    }

    /**
     * getOrigin get the origin cache instance
     * @return {TankCache}
     */
    getOrigin() {
        return this.handle;
    }
}

module.exports = FileCacheAdapter

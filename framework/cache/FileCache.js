const Facades = require('../facades/Facades');
const path = require('path');
const fs = require('fs');
const Cache = require('./Cache');
const DS = require('ds').DS;
const TankCache = require('tank-cache');
module.exports = class FileCache extends Cache {
    // config = {
    //     saveFile: ".runtime/cache.json"
    // }

    /**
     *
     * @param {string} savePath
     */
    constructor(savePath) {
        super();
        this.cache = new TankCache(savePath);
    }

    /**
     *
     * @param {string} key
     * @return {boolean}
     */
    has(key) {
        return this.cache.Has(key);
    }

    /**
     * get Retrieve an item from the cache by key.
     * @param {string} key
     * @param {*} defaultVal
     * @return {string|null}
     * @Function
     */
    get(key, defaultVal = null) {
        return this.cache.Get(key, defaultVal);
    }

    /**
     *
     * @param {string} key
     * @param {*} val
     */
    forever(key, val) {
        this.cache.Forever(key, val);
    }

    /**
     * forget remove an item from the cache.
     * @param {string} key
     * @return {null|*}
     * @Function
     */
    forget(key) {
        return this.cache.Forget(key);
    }

    /**
     * pull Retrieve an item from the cache and delete it.
     * @param {string} key
     * @return {*}
     * @Function
     */
    pull(key) {
        return this.cache.Pull(key);
    }


    /**
     * set store an item in the cache for a given number of seconds.
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @Function
     */
    store(key, val = null, ttl = 0) {
        this.cache.Store(key, val, ttl);
    }

    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @Function
     */
    set(key, val = null, ttl = 0) {
        this.cache.Store(key, val, ttl);
    }

    /**
     * The add method will only store data that does not exist in the cache. If the storage is successful,
     * it will return true, otherwise it will return false:
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @return {boolean}
     * @Function
     */
    add(key, val = null, ttl = 0) {
        return this.cache.Add(key, val, ttl);
    }

    /**
     * clear cache
     * @Function
     */
    flush() {
        return this.cache.Flush();
    }
};

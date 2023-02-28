const Facades = require("../facades/Facades");
const path = require("path");
const fs = require("fs");
const Cache = require("./Cache");
const DS = require("ds").DS;
const tankCache = require("tank-cache")
module.exports = class FileCache extends Cache {
    // config = {
    //     saveFile: ".runtime/cache.json"
    // }


    constructor(savePath) {
        super();
        this.cache = new tankCache(savePath)

    }

    Has(key) {
        return this.cache.Has(key)
    }

    /**
     * Get Retrieve an item from the cache by key.
     * @param key
     * @param defaultVal?
     * @return {string|null}
     * @Function
     */
    Get(key, defaultVal = null) {
        return this.cache.Get(key, defaultVal)
    }

    Forever(key, val) {
        return this.cache.Forever(key, val)
    }

    /**
     * Forget Remove an item from the cache.
     * @param key
     * @return {null|*}
     * @Function
     */
    Forget(key) {
        return this.cache.Forget(key)
    }

    /**
     * Pull Retrieve an item from the cache and delete it.
     * @param key
     * @Function
     */
    Pull(key) {
        return this.cache.Pull(key)
    }


    /**
     * Set Store an item in the cache for a given number of seconds.
     * @param key
     * @param val
     * @param ttl Second
     * @return {*}
     * @Function
     */
    Store(key, val = null, ttl = 0) {
        this.cache.Store(key, val, ttl);
    }

    /**
     * Set Store an item in the cache for a given number of seconds. as same Store function
     * @param key
     * @param val
     * @param ttl Second
     * @return {*}
     * @Function
     */
    Set(key, val = null, ttl = 0) {
        this.cache.Store(key, val, ttl);
    }

    /**
     * The Add method will only store data that does not exist in the cache. If the storage is successful, it will return true, otherwise it will return false:
     * @param key
     * @param val
     * @param ttl
     * @return {boolean}
     * @Function
     */
    Add(key, val = null, ttl = 0) {
        return this.cache.Add(key, val, ttl);
    }

    /**
     * clear Cache
     * @Function
     */
    Flush() {
        return this.cache.Flush();
    }
}

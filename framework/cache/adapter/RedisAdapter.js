const CacheAbstract = require('../CacheAbstract');
const Redis = require('ioredis')
const path = require("path");

class RedisAdapter extends CacheAbstract {
    options = {
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        username: "default", // needs Redis >= 6
        password: null,
        db: 0, // Defaults to 0
    }
    handle = null;

    /**
     * @param options
     */
    constructor(options = {}) {
        super();

        // @ts-ignore
        this.handle = new Redis({
            ...Object.assign(this.options, options)
        });
    }

    /**
     *
     * @param {string} key
     * @return {Promise<boolean>}
     */
    async has(key) {

        return await this.handle.exists(key) === 1;
    }

    /**
     * get Retrieve an item from the cache by key.
     * @param {string} key
     * @param {string|number|null} defaultVal
     * @return {Promise<*>}
     * @Function
     */
    async get(key, defaultVal = null) {
        return await this.handle.get(key) || defaultVal
    }

    /**
     *
     * @param {string} key
     * @param {*}[val=null] val
     * @return {Promise<void>}
     */
    async forever(key, val = null) {
        return await this.handle.set(key, val);
    }

    /**
     * forget remove an item from the cache.
     * @param {string} key
     * @return {Promise<*>}
     * @Function
     */
    async forget(key) {
        return await this.handle.del(key);
    }

    /**
     * pull Retrieve an item from the cache and delete it.
     * @param {string} key
     * @return {Promise<*>}
     * @Function
     */
    async pull(key) {
        const value = await this.handle.get(key);
        await this.forget(key);
        return value;
    }


    /**
     * set store an item in the cache for a given number of seconds.
     * @param {string} key
     * @param {string|number|null} val
     * @param {number} ttl Second
     * @return {Promise<void>}
     * @Function
     */
    async store(key, val = null, ttl = 0) {
        await this.handle.set(key, val);
        await this.handle.expire(key, val);
    }

    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param {string} key
     * @param {string|number|null} val
     * @param {number} ttl Second
     * @return {Promise<void>}
     * @Function
     */
    async set(key, val = null, ttl = 0) {
        await this.store(key, val, ttl);
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
    async add(key, val = null, ttl = 0) {
        await this.store(key, val, ttl);
    }

    /**
     * clear cache
     * @Function
     * @return {Promise<void>}
     */
    async flush() {
        await this.handle.flushdb();
    }

    /**
     * setTtl set the ttl of the key
     * @param  {string} key
     * @param {number} ttl   second
     * @return {Promise<void>}
     */
    async setTtl(key, ttl) {
        await this.handle.expire(key, ttl);
    }

    /**
     * getOrigin get origin redis instance
     * @return {Redis}
     * @Function
     */
    getOrigin() {
        return this.handle;
    }
}

module.exports = RedisAdapter
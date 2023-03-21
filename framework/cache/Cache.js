class Cache {
    /**
     * @public
     */
    TIME_ONE_SECOND = 1;
    /**
     * @public
     */
    TIME_ONE_MINUTE = 60 * this.TIME_ONE_SECOND;
    /**
     * @public
     */
    TIME_ONE_HOUR = 60 * this.TIME_ONE_MINUTE;
    /**
     * @public
     */
    TIME_ONE_DAY = 24 * this.TIME_ONE_HOUR;
    /**
     * @public
     */
    TIME_ONE_YEAR = 365 * this.TIME_ONE_DAY;

    constructor() {
    }

    has(key) {
        return null;
    }

    /**
     * get Retrieve an item from the cache by key.
     * @param {string} key
     * @param {*} [defaultVal=null]
     * @return {string|null}
     * @public
     * @function
     */
    get(key, defaultVal = null) {
        return null;
    }

    forever(key, val) {
        this.store(key, val, 0);
    }

    /**
     * forget remove an item from the cache.
     * @param {string} key
     * @return {null|*}
     * @function
     */
    forget(key) {
        return null;
    }

    /**
     * pull Retrieve an item from the cache and delete it.
     * @param  {string} key
     * @return {null|*}
     */
    pull(key) {
        return null;
    }

    _now() {
        return (new Date()).getTime();
    }

    /**
     * set store an item in the cache for a given number of seconds.
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @function
     */
    store(key, val = null, ttl = 0) {
    }

    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @function
     */
    set(key, val = null, ttl = 0) {
    }

    /**
     * The add method will only store data that does not exist in the cache. If the storage is successful, it will return true, otherwise it will return false:
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @return {boolean}
     * @function
     */
    add(key, val = null, ttl = 0) {
        return false;
    }
}

module.exports = Cache;

module.exports = class Cache {
    constructor() {
        /**
         * @public
         */
        this.TIME_ONE_SECOND = 1;
        /**
         * @public
         */
        this.TIME_ONE_MINUTE = 60 * this.TIME_ONE_SECOND;
        /**
         * @public
         */
        this.TIME_ONE_HOUR = 60 * this.TIME_ONE_MINUTE;
        /**
         * @public
         */
        this.TIME_ONE_DAY = 24 * this.TIME_ONE_HOUR;
        /**
         * @public
         */
        this.TIME_ONE_YEAR = 365 * this.TIME_ONE_DAY;
    }
    Has(key) {
        return null;
    }
    /**
     * Get Retrieve an item from the cache by key.
     * @param key
     * @param defaultVal?
     * @return {string|null}
     * @Function
     */
    Get(key, defaultVal = null) {
        return null;
    }
    Forever(key, val) {
        this.Store(key, val, 0);
    }
    /**
     * Forget Remove an item from the cache.
     * @param key
     * @return {null|*}
     * @Function
     */
    Forget(key) {
        return null;
    }
    /**
     * Pull Retrieve an item from the cache and delete it.
     * @param key
     * @Function
     */
    Pull(key) {
        return null;
    }
    _Now() {
        return (new Date()).getTime();
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
        return false;
    }
};

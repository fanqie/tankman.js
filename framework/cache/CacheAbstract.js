class CacheAbstract {

    /**
     * CacheAbstract constructor.
     */
    constructor() {
        if (new.target === CacheAbstract) {
            throw new TypeError('Cannot construct abstract instances directly');
        }
    }

    /**
     * has Determined if an item exists in the cache.
     * @param {string} key
     * @return {Promise<boolean>}
     */
    has(key) {
        throw new Error('Method not implemented')
    }

    /**
     * get Retrieve an item from the cache by key.
     * @param {string} key
     * @param {string|number|null} [defaultVal=null]
     * @return {Promise<*>}
     * @public
     * @function
     */
    get(key, defaultVal = null) {
        throw new Error('Method not implemented')
    }

    /**
     * forever store an item in the cache indefinitely.
     * @param {string} key
     * @return {Promise<void>}
     */
    forever(key, val) {
        throw new Error('Method not implemented')
    }

    /**
     * forget remove an item from the cache.
     * @param {string} key
     * @return {Promise<void>}
     * @function
     */
    forget(key) {
        throw new Error('Method not implemented')
    }

    /**
     * pull Retrieve an item from the cache and delete it.
     * @param  {string} key
     * @return {Promise<void>}
     */
    pull(key) {
        throw new Error('Method not implemented')
    }

    /**
     * _now get current time
     * @return {number}
     * @private
     */
    _now() {
        return (new Date()).getTime();
    }

    /**
     * set store an item in the cache for a given number of seconds.
     * @param {string} key
     * @param {string|number|null} val
     * @param {number} ttl Second
     * @return {Promise<void>}
     * @function
     */
    store(key, val = null, ttl = 0) {
        throw new Error('Method not implemented')
    }

    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param {string} key
     * @param {string|number|null} val
     * @param {number} ttl Second
     * @return {Promise<void>}
     * @function
     */
    set(key, val = null, ttl = 0) {
        throw new Error('Method not implemented')
    }

    /**
     * The add method will only store data that does not exist in the cache. If the storage is successful, it will return true, otherwise it will return false:
     * @param {string} key
     * @param {string|number|null} val
     * @param {number} ttl Second
     * @return {Promise<void>}
     * @function
     */
    add(key, val = null, ttl = 0) {
        throw new Error('Method not implemented')
    }

    /**
     * getOrigin get the origin cache handle
     * @return {any}
     */
    getOrigin() {
        throw new Error('Method not implemented')
    }

    /**
     * flush Remove all items from the cache.
     * @return {Promise<void>}
     */
    flush() {
        throw new Error('Method not implemented')
    }

    /**
     * setTtl set the ttl of the key
     * @param  {string} key
     * @param {number} ttl   second
     * @return {Promise<void>}
     */
    setTtl(key, ttl) {
        throw new Error('Method not implemented')
    }
}

module.exports = CacheAbstract;

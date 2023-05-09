class CacheAbstract {


    constructor() {
        if (new.target === CacheAbstract) {
            throw new TypeError('Cannot construct abstract instances directly');
        }
    }

    has(key) {
        throw new Error('Method not implemented')
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
        throw new Error('Method not implemented')
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
        throw new Error('Method not implemented')
    }

    /**
     * pull Retrieve an item from the cache and delete it.
     * @param  {string} key
     * @return {null|*}
     */
    pull(key) {
        throw new Error('Method not implemented')
    }

    _now() {
        return (new Date()).getTime();
    }

    /**
     * set store an item in the cache for a given number of seconds.
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @return {void}
     * @function
     */
    store(key, val = null, ttl = 0) {
        throw new Error('Method not implemented')
    }

    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @return {void}
     * @function
     */
    set(key, val = null, ttl = 0) {
        throw new Error('Method not implemented')
    }

    /**
     * The add method will only store data that does not exist in the cache. If the storage is successful, it will return true, otherwise it will return false:
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @return {void}
     * @function
     */
    add(key, val = null, ttl = 0) {
        throw new Error('Method not implemented')
    }

    getOrigin(){
        throw new Error('Method not implemented')
    }
}

module.exports = CacheAbstract;

export = CacheAbstract;
declare class CacheAbstract {
    /**
     * has Determined if an item exists in the cache.
     * @param {string} key
     * @return {Promise<boolean>}
     */
    has(key: string): Promise<boolean>;
    /**
     * get Retrieve an item from the cache by key.
     * @param {string} key
     * @param {string|number|null} [defaultVal=null]
     * @return {Promise<*>}
     * @public
     * @function
     */
    public get(key: string, defaultVal?: string | number | null): Promise<any>;
    /**
     * forever store an item in the cache indefinitely.
     * @param {string} key
     * @return {Promise<void>}
     */
    forever(key: string, val: any): Promise<void>;
    /**
     * forget remove an item from the cache.
     * @param {string} key
     * @return {Promise<void>}
     * @function
     */
    forget(key: string): Promise<void>;
    /**
     * pull Retrieve an item from the cache and delete it.
     * @param  {string} key
     * @return {Promise<void>}
     */
    pull(key: string): Promise<void>;
    /**
     * _now get current time
     * @return {number}
     * @private
     */
    private _now;
    /**
     * set store an item in the cache for a given number of seconds.
     * @param {string} key
     * @param {string|number|null} val
     * @param {number} ttl Second
     * @return {Promise<void>}
     * @function
     */
    store(key: string, val?: string | number | null, ttl?: number): Promise<void>;
    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param {string} key
     * @param {string|number|null} val
     * @param {number} ttl Second
     * @return {Promise<void>}
     * @function
     */
    set(key: string, val?: string | number | null, ttl?: number): Promise<void>;
    /**
     * The add method will only store data that does not exist in the cache. If the storage is successful, it will return true, otherwise it will return false:
     * @param {string} key
     * @param {string|number|null} val
     * @param {number} ttl Second
     * @return {Promise<void>}
     * @function
     */
    add(key: string, val?: string | number | null, ttl?: number): Promise<void>;
    /**
     * getOrigin get the origin cache handle
     * @return {any}
     */
    getOrigin(): any;
    /**
     * flush Remove all items from the cache.
     * @return {Promise<void>}
     */
    flush(): Promise<void>;
    /**
     * setTtl set the ttl of the key
     * @param  {string} key
     * @param {number} ttl   second
     * @return {Promise<void>}
     */
    setTtl(key: string, ttl: number): Promise<void>;
}

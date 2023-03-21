export = Cache;
declare class Cache {
    /**
     * @public
     */
    public TIME_ONE_SECOND: number;
    /**
     * @public
     */
    public TIME_ONE_MINUTE: number;
    /**
     * @public
     */
    public TIME_ONE_HOUR: number;
    /**
     * @public
     */
    public TIME_ONE_DAY: number;
    /**
     * @public
     */
    public TIME_ONE_YEAR: number;
    has(key: any): any;
    /**
     * get Retrieve an item from the cache by key.
     * @param {string} key
     * @param {*} [defaultVal=null]
     * @return {string|null}
     * @public
     * @function
     */
    public get(key: string, defaultVal?: any): string | null;
    forever(key: any, val: any): void;
    /**
     * forget remove an item from the cache.
     * @param {string} key
     * @return {null|*}
     * @function
     */
    forget(key: string): null | any;
    /**
     * pull Retrieve an item from the cache and delete it.
     * @param  {string} key
     * @return {null|*}
     */
    pull(key: string): null | any;
    _now(): number;
    /**
     * set store an item in the cache for a given number of seconds.
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @function
     */
    store(key: string, val?: any, ttl?: number): void;
    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @function
     */
    set(key: string, val?: any, ttl?: number): void;
    /**
     * The add method will only store data that does not exist in the cache. If the storage is successful, it will return true, otherwise it will return false:
     * @param {string} key
     * @param {*} val
     * @param {number} ttl Second
     * @return {boolean}
     * @function
     */
    add(key: string, val?: any, ttl?: number): boolean;
}

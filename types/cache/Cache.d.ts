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
    Has(key: any): any;
    /**
     * Get Retrieve an item from the cache by key.
     * @param key
     * @param defaultVal?
     * @return {string|null}
     * @public
     * @function
     */
    public Get(key: any, defaultVal?: any): string | null;
    Forever(key: any, val: any): void;
    /**
     * Forget Remove an item from the cache.
     * @param key
     * @return {null|*}
     * @function
     */
    Forget(key: any): null | any;
    /**
     * Pull Retrieve an item from the cache and delete it.
     * @param key
     * @function
     */
    Pull(key: any): any;
    _Now(): number;
    /**
     * Set Store an item in the cache for a given number of seconds.
     * @param key
     * @param val
     * @param ttl Second
     * @return {*}
     * @function
     */
    Store(key: any, val?: any, ttl?: number): any;
    /**
     * Set Store an item in the cache for a given number of seconds. as same Store function
     * @param key
     * @param val
     * @param ttl Second
     * @return {*}
     * @function
     */
    Set(key: any, val?: any, ttl?: number): any;
    /**
     * The Add method will only store data that does not exist in the cache. If the storage is successful, it will return true, otherwise it will return false:
     * @param key
     * @param val
     * @param ttl
     * @return {boolean}
     * @function
     */
    Add(key: any, val?: any, ttl?: number): boolean;
}

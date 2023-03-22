export = FileCache;
declare class FileCache extends Cache {
    /**
     *
     * @param {string} savePath
     */
    constructor(savePath: string);
    cache: any;
    /**
     *
     * @param {string} key
     * @return {boolean}
     */
    has(key: string): boolean;
    /**
     *
     * @param {string} key
     * @param {*} val
     */
    forever(key: string, val: any): void;
    /**
     * clear cache
     * @Function
     */
    flush(): void;
}
import Cache = require("./Cache");

export = FileCacheAdapter;
declare class FileCacheAdapter extends CacheAbstract {
    /**
     * @param {string} savePath
     */
    constructor(savePath?: string);
    handle: any;
}
import CacheAbstract = require("../CacheAbstract");

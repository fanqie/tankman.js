export = FileCache;
declare class FileCache extends Cache {
    constructor(savePath: any);
    cache: any;
    Forever(key: any, val: any): any;
    /**
     * clear Cache
     * @Function
     */
    Flush(): any;
}
import Cache = require("./Cache");

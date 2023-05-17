export = RedisAdapter;
declare class RedisAdapter extends CacheAbstract {
    /**
     * @param options
     */
    constructor(options?: {});
    options: {
        port: number;
        host: string;
        username: string;
        password: any;
        db: number;
    };
    handle: any;
}
import CacheAbstract = require("../CacheAbstract");

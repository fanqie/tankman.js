//@ts-nocheck
module.exports = class FacadesClass {
    constructor() {
    }

    /**
     * @type import('log4js').Config
     */
    Config;
    /**
     * @type Env
     */
    Env;
    /**
     * @type Route
     */
    Route;
    Cache;
    /**
     * @type OrmClassType|Knex|Function
     */
    Db;
    Auth;
    /**
     * @type Log
     */
    Log;
    FileSystem;
    Grpc;
    Queue;
    Schedule;
    /**
     * @type ProcessInfo
     */
    ProcessInfo;
    Engine;
    UpLo;
}

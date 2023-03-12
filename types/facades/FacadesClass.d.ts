export = FacadesClass;
declare class FacadesClass {
    /**
     * @type import('log4js').Config
     */
    Config: import('log4js').Config;
    /**
     * @type Env
     */
    Env: Env;
    /**
     * @type Route
     */
    Route: Route;
    /**
     * @type Cache
     */
    Cache: Cache;
    /**
     * @type OrmClassType|Knex|Function
     */
    Db: OrmClassType | Knex | Function;
    Auth: any;
    /**
     * @type Log
     */
    Log: Log;
    FileSystem: any;
    Grpc: any;
    Queue: any;
    Schedule: any;
    /**
     * @type ProcessInfo
     */
    ProcessInfo: ProcessInfo;
    Engine: any;
    /**
     * @type Application
     */
    App: Application;
    /**
     * @type Xss
     */
    Xss: Xss;
}

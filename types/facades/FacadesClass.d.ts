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
    Cache: any;
    /**
     * @type Db
     */
    Db: Db;
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
    UpLo: any;
}

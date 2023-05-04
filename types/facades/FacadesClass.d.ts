export = FacadesClass;
declare class FacadesClass {
    /**
     * @type import('log4js').Config
     */
    config: import('log4js').Config;
    /**
     * @type Env
     */
    env: Env;
    /**
     * @type Route
     */
    route: Route;
    /**
     * @type Cache
     */
    cache: Cache;
    /**
     * @type OrmClassType|Knex|Function
     */
    db: OrmClassType | Knex | Function;
    auth: any;
    /**
     * @type Log
     */
    log: Log;
    fileSystem: any;
    grpc: any;
    /**
     * @type HttpClient
     */
    httpClient: HttpClient;
    queue: any;
    schedule: any;
    /**
     * @type ProcessInfo
     */
    processInfo: ProcessInfo;
    engine: any;
    /**
     * @type Application
     */
    app: Application;
    /**
     * @type Xss
     */
    xss: Xss;
    /**
     * @type TemplateEngineAbstract
     */
    view: TemplateEngineAbstract;
}

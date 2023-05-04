// @ts-nocheck
module.exports = class FacadesClass {
    constructor() {
    }

    /**
     * @type import('log4js').Config
     */
    config;
    /**
     * @type Env
     */
    env;
    /**
     * @type Route
     */
    route;
    /**
     * @type Cache
     */
    cache;
    /**
     * @type OrmClassType|Knex|Function
     */
    db;
    auth;
    /**
     * @type Log
     */
    log;
    fileSystem;
    grpc;
    /**
     * @type HttpClient
     */
    httpClient;
    queue;
    schedule;
    /**
     * @type ProcessInfo
     */
    processInfo;
    engine;
    /**
     * @type Application
     */
    app;
    /**
     * @type Xss
     */
    xss;

    /**
     * @type TemplateEngineAbstract
     */
    view;
};

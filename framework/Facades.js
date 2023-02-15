/** @typedef {typeof import('./Orm/Db')} DB */
/** @typedef {typeof import('./Config/Config')} Config */
/** @typedef {typeof import('./Config/Env')} Env */
/** @typedef {typeof import('./Log/Log')} Log */
/** @typedef {typeof import('./Route/Route')} Route */
module.exports = {
    /**
     * @type Config
     */
    Config: null,
    /**
     * @type Env
     */
    Env: null,
    /**
     * @type Route
     */
    Route: null,
    Cache: null,
    /**
     * @type DB|Knex
     */
    DB: null,
    Auth: null,
    /**
     * @type Log
     */
    Log: null,
    FileSystem: null,
    Grpc: null,
    Queue: null,
    Schedule: null,
    ProcessInfo: null,
    Engine: null,
    UpLo: null,
}

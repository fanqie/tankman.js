/** @typedef {typeof import('./orm/Db')} DB */
/** @typedef {typeof import('./config/config')} Config */
/** @typedef {typeof import('./config/Env')} Env */
/** @typedef {typeof import('./log/log')} Log */
/** @typedef {typeof import('./route/route')} Route */
/** @typedef {typeof import('./utils/ProcessInfo')} ProcessInfo */
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
    /**
     * @type ProcessInfo
     */
    ProcessInfo: null,
    Engine: null,
    UpLo: null,
};

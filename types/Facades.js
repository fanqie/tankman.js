const Db = require('./orm/Db');
const Env = require('./config/Env');
const Log = require('./log/Log');
const Route = require('./route/Route');
const ProcessInfo = require('./utils/ProcessInfo');
/** @typedef {typeof import('./orm/Db')} DB */
module.exports = {
    /**
     * @type import('log4js').Config
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
    Db,
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

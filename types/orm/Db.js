// @ts-nocheck
const Orm = require("./Orm");
const { Facades } = require("../Index");
const Knex = require("knex");
class DB {
    constructor() {
        this.con = this.ConnectionDefaultDb();
    }
    /**
     * The connection options are passed directly to the appropriate database client to create the connection, and may be either an object, a connection string, or a function returning an object:
     * create free kNex connection
     * const kDb = FC.DB.NewConnection({
     *      client: 'mysql',
     *      connection: {
     *          host : '127.0.0.1',
     *          port : 3306,
     *          user : 'your_database_user',
     *          password : 'your_database_password',
     *          database : 'myapp_test'
     *      }
     *  });
     * @param options
     * @return {Knex<TRecord, TResult>}
     * @inheritDoc https://knexjs.org/guide/#configuration-options
     */
    static NewConnection(options = {}) {
        return Knex(options);
    }
    /**
     *
     * @return {Knex}
     * @public
     */
    ConnectionDefaultDb() {
        const configs = Facades.Config.Get("database", null);
        if (configs.default && configs.hasOwnProperty(configs.default)) {
            return this.Connection(configs[configs.default], configs.default);
        }
        else {
            console.warn("Configuration default database not found");
        }
    }
    /**
     *
     * @param config
     * @param client
     * @return {Knex}
     * @constructor
     */
    Connection(config, client = "mysql") {
        if (config === null) {
            throw new Error("Missing database configuration");
        }
        config.log = {
            warn(message) {
                Facades.Log.Warn(message, "database");
            },
            error(message) {
                Facades.Log.Error(message, "database");
            },
            deprecate(message) {
                Facades.Log.Info(message, "database");
            },
            debug(message) {
                Facades.Log.Debug(message.sql, "database");
            },
        };
        return Knex(config);
    }
    /**
     *
     * @param client
     * @return {Knex}
     * @public
     */
    ConnectTo(client) {
        const configs = Facades.Config.Get("database", null);
        if (configs.hasOwnProperty(client)) {
            return Knex(configs[client]);
        }
        else {
            throw new Error(`Configuration default ${client} not found`);
        }
    }
}
module.exports = DB;

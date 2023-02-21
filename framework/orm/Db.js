const Orm = require("./Orm")
const {FC} = require("../Index");
const Knex = require("knex");

class DB {

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
        return  Knex(options);
    }

    /**
     *
     * @return {Knex<TRecord, TResult>}
     * @constructor
     */
    static ConnectionDefaultDb() {
        const configs = FC.Config.Get("database", null)
        if (configs.default && configs.hasOwnProperty(configs.default)) {
            return this.Connection(configs[configs.default], configs.default)
        } else {
            console.warn("Configuration default database not found")
        }

    }

    /**
     *
     * @param config
     * @param client
     * @return {Knex<TRecord, TResult>}
     * @private
     */
    static Connection(config, client = "mysql") {

        if (config === null) {
            throw new Error("Missing database configuration")
        }

        config.log = {
            warn(message) {
                FC.Log.Warn(message,"database")
            },
            error(message) {
                FC.Log.Error(message,"database")
            },
            deprecate(message) {
                FC.Log.Info(message,"database")
            },
            debug(message) {
                FC.Log.Debug(message.sql,"database")
            },
        }
        return Knex(config)

    }

    /**
     *
     * @param client
     * @return {Knex<TRecord, TResult>}
     * @constructor
     */
    static ConnectTo(client) {

        const configs = FC.Config.Get("database", null)

        if (configs.hasOwnProperty(client)) {

            return Knex(configs[client])
        } else {
            console.warn(`Configuration default ${client} not found`)
        }
    }
}

module.exports = DB;

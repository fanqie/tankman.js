const Facades = require("../facades/Facades")
const Orm = require("./Orm");
const Knex = require("knex");
const OrmClassType = require("./OrmType");

class DbManager {
    /**
     * @type {Orm|Knex}
     */
    defaultConn;
    /**
     * @type {Map<string, OrmClassType>}
     */
    connMap = new Map()


    constructor() {

        this.defaultConn = this._ConnectionDefaultDb()
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     * @inheritDoc https://knexjs.org/guide/query-builder.html
     */
    GetDefault() {
        return this.defaultConn
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
     * @return {OrmClassType|Knex}
     * @inheritDoc https://knexjs.org/guide/#configuration-options
     */
    NewConnection(options = {}) {
        if (!options.client || !options.connection) {
            console.warn("Configuration error")
        }
        return this._Connection(options, options.client);
    }

    /**
     * @return {OrmClassType|Knex}
     * @private
     */
    _ConnectionDefaultDb() {
        const configs = Facades.Config.Get("database", null)
        if (configs.default && configs.hasOwnProperty(configs.default)) {
            return this._Connection(configs[configs.default], configs.default)
        } else {
            console.warn("Configuration default database not found")
        }

    }

    /**
     *
     * @param config
     * @param client
     * @return {OrmClassType|Knex}
     * @private
     */
    _Connection(config, client = "mysql") {
        if (config === null) {
            throw new Error("Missing database configuration")
        }
        config.log = {
            warn(message) {
                Facades.Log.Warn(message, "database")
            }, error(message) {
                Facades.Log.Error(message, "database")
            }, deprecate(message) {
                Facades.Log.Info(message, "database")
            }, debug(message) {
                Facades.Log.Debug(message.sql, "database")
            },
        }
        //singleton
        if (this.connMap.has(client)) {
            return this.connMap.get(client);
        }
        this.connMap.set(client, Orm(config))
        /**
         * @type {DbManager}
         */
        this.connMap.get(client).instance = this

    }

    /**
     * Get Orm instance
     * @param client
     * @return {OrmClassType|Knex}
     * @public
     */
    Get(client) {
        const configs = Facades.Config.Get("database", null);
        if (configs.hasOwnProperty(client)) {
            return this.connMap.get(client) || this._Connection(configs[client], client);
        } else {
            throw new Error(`Configuration default ${client} not found`)

        }
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    Mysql() {
        return this.Get("mysql")
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    Postgre() {
        return this.Get("pg")
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    Oracle() {
        return this.Get("oracledb")
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    Sqlite3() {
        return this.Get("sqlite3")
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    Mssql() {
        return this.Get("mssql")
    }
}

module.exports = DbManager;

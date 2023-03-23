const facades = require('../facades/Facades');
const orm = require('./Orm');
const Knex = require('knex');
const OrmClassType = require('./OrmType');

class DbManager {
    /**
     * @type {orm|Knex}
     */
    defaultConn;
    /**
     * @type {Map<string, OrmClassType|Knex|*>}
     */
    connMap = new Map();


    constructor() {
        this.defaultConn = this._connectionDefaultDb();
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     * @inheritDoc https://knexjs.org/guide/query-builder.html
     */
    getDefault() {
        return this.defaultConn;
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
     * @param {Object} options
     * @return {OrmClassType|Knex}
     * @inheritDoc https://knexjs.org/guide/#configuration-options
     */
    newConnection(options = {}) {
        if (!options.client || !options.connection) {
            console.warn('Configuration error');
        }
        return this._connection(options, options.client);
    }

    /**
     * @return {OrmClassType|Knex}
     * @private
     */
    _connectionDefaultDb() {
        const configs = facades.config?.get('database', null);
        if (configs && configs.default && configs.hasOwnProperty(configs.default)) {
            return this._connection(configs[configs.default], configs.default);
        } else {
            facades.log?.warn('Configuration default database not found');
        }
    }

    /**
     *
     * @param {{log:{},client:string,connection:{},wrapIdentifier:function,pool:{min: number, max: number},acquireConnectionTimeout:number,debug: boolean,prefix:string}|null} config
     * @param {string} client
     * @return {OrmClassType|Knex}
     * @private
     */
    _connection(config, client = 'mysql') {
        if (config === null) {
            throw new Error('Missing database configuration');
        }
        config.log = {
            warn(message) {
                facades.log.warn(message, 'database');
            }, error(message) {
                facades.log.error(message, 'database');
            }, deprecate(message) {
                facades.log.info(message, 'database');
            }, debug(message) {
                facades.log.debug(message.sql, 'database');
            },
        };
        // singleton
        if (this.connMap.has(client)) {
            return this.connMap.get(client);
        }
        config.wrapIdentifier=(
            value,
            origImpl,
            queryContext
        ) => origImpl(
            ((value,
              origImpl,
              queryContext)=>{
                console.log( value,
                    origImpl,
                    queryContext)
                return value
            })(value,
                origImpl,
                queryContext)
        )
        let ormInstance = orm(config)

        // ormInstance.on("query",(builder)=>{
        //     console.log(builder)
        //     builder.table(config.prefix+builder.tableName)
        //     return builder
        // })
        this.connMap.set(client, ormInstance);

        /**
         * @type {DbManager}
         */
        this.connMap.get(client).instance = this;

        return this.connMap.get(client);
    }

    /**
     * get Orm instance
     * @param {string} client
     * @return {OrmClassType|Knex}
     * @public
     */
    get(client) {
        const configs = facades.config?.get('database', null);
        if (configs.hasOwnProperty(client)) {
            return this.connMap.get(client) || this._connection(configs[client], client);
        } else {
            throw new Error(`Configuration default ${client} not found`);
        }
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    mysql() {
        return this.get('mysql');
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    postgre() {
        return this.get('pg');
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    oracle() {
        return this.get('oracledb');
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    sqlite3() {
        return this.get('sqlite3');
    }

    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    mssql() {
        return this.get('mssql');
    }
}

module.exports = DbManager;

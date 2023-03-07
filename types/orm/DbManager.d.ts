export = DbManager;
declare class DbManager {
    /**
     * @type {Orm|Knex}
     */
    defaultConn: any | typeof Knex;
    /**
     *
     * @type {{string:Orm|Knex}}
     */
    connMap: {
        string: any | typeof Knex;
    };
    /**
     * @return {OrmClassType|Knex}
     * @public
     * @inheritDoc https://knexjs.org/guide/query-builder.html
     */
    public GetDefault(): OrmClassType | typeof Knex;
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
    NewConnection(options?: {}): OrmClassType | typeof Knex;
    /**
     * @return {OrmClassType|Knex}
     * @private
     */
    private _ConnectionDefaultDb;
    /**
     *
     * @param config
     * @param client
     * @return {OrmClassType|Knex}
     * @private
     */
    private _Connection;
    /**
     * Get Orm instance
     * @param client
     * @return {Orm|Knex}
     * @public
     */
    public Get(client: any): any | typeof Knex;
}
import Knex = require("knex");

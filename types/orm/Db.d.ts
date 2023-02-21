export = DB;
declare class DB {
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
    static NewConnection(options?: {}): typeof Knex;
    /**
     * @type {Knex}
     */
    con: typeof Knex;
    /**
     *
     * @return {Knex}
     * @public
     */
    public ConnectionDefaultDb(): typeof Knex;
    /**
     *
     * @param config
     * @param client
     * @return {Knex}
     * @constructor
     */
    Connection(config: any, client?: string): typeof Knex;
    /**
     *
     * @param client
     * @return {Knex}
     * @public
     */
    public ConnectTo(client: any): typeof Knex;
}
import Knex = require("knex");

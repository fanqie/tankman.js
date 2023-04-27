export = DbManager;
declare class DbManager {
    /**
     * @type {orm|Knex}
     */
    defaultConn: any | typeof Knex;
    /**
     * @type {Map<string, OrmClassType|Knex|*>}
     */
    connMap: Map<string, OrmClassType | typeof Knex | any>;
    /**
     * @return {OrmClassType|Knex}
     * @public
     * @inheritDoc https://knexjs.org/guide/query-builder.html
     */
    public getDefault(): OrmClassType | typeof Knex;
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
    newConnection(options?: any): OrmClassType | typeof Knex;
    /**
     * @return {OrmClassType|Knex}
     * @private
     */
    private _connectionDefaultDb;
    /**
     *
     * @param {{log:{},client:string,connection:{},wrapIdentifier:function,pool:{min: number, max: number},acquireConnectionTimeout:number,debug: boolean,prefix:string}|null} config
     * @param {string} client
     * @return {OrmClassType|Knex}
     * @private
     */
    private _connection;
    /**
     * get Orm instance
     * @param {string} client
     * @return {OrmClassType|Knex}
     * @public
     */
    public get(client: string): OrmClassType | typeof Knex;
    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    public mysql(): OrmClassType | typeof Knex;
    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    public postgre(): OrmClassType | typeof Knex;
    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    public oracle(): OrmClassType | typeof Knex;
    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    public sqlite3(): OrmClassType | typeof Knex;
    /**
     * @return {OrmClassType|Knex}
     * @public
     */
    public mssql(): OrmClassType | typeof Knex;
}
import Knex = require("knex");
import OrmClassType = require("./OrmType");

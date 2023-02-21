export = DB;
declare class DB {
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

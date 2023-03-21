export = OrmClassType;
declare class OrmClassType {
    /**
     * @type {DbManager}
     */
    instance: DbManager;
    /**
     *
     * @type {knex|function}
     */
    table: typeof knex | Function;
}
import DbManager = require("./DbManager");
import knex = require("knex");

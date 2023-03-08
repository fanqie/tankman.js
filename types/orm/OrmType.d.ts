export = OrmClassType;
declare class OrmClassType {
    /**
     * @type {DbManager}
     */
    instance: DbManager;
}
import DbManager = require("./DbManager");

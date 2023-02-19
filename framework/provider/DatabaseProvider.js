const ServiceProvider = require("./ServiceProvider");
const DB = require("../orm/Db.js");
const {FC} = require("../Index");

class DatabaseProvider extends ServiceProvider {
    constructor(app) {
        super(app);

    }

    register() {
        /**
         * DB
         * @type {DB}
         */
        FC.DB = DB.ConnectionDefaultDb()

    }

    boot() {
        FC.DB.ConnectTo = DB.ConnectTo
    }
}

module.exports = DatabaseProvider

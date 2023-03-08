const Knex = require("knex")
const DbManager = require("./DbManager")

class OrmClassType {
    /**
     * @type OrmClassType|Knex
     */
    constructor() {
    }

    /**
     * @type {DbManager}
     */
    instance = null
}

module.exports = OrmClassType


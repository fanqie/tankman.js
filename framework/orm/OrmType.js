// @ts-nocheck
const knex = require('knex');
const DbManager = require('./DbManager');

class OrmClassType {
    /**
     * @type {knex|knex.Client|knex.TableBuilder|knex.ColumnBuilder|knex.QueryBuilder|knex.KnexTimeoutError|knex.ViewBuilder|knex.SchemaBuilder|knex.KnexTimeoutError}
     */
    constructor() {
    }

    /**
     * @type {DbManager}
     */
    instance = null;
    /**
     *
     * @type {knex|function}
     */
    table = null;
}

module.exports = OrmClassType;


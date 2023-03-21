// @ts-nocheck
// # Then add one of the following (adding a --save) flag:


// $ npm install mysql
// $ npm install mysql2
// $ npm install tedious ->>>mssql

// $ npm install pg
// $ npm install pg-native

// $ npm install sqlite3
// $ npm install better-sqlite3

// $ npm install oracledb
const lodash = require('lodash');
const Knex = require('knex');

/**
 * @property {DbManager} instance
 * @return {knex.Client|knex.TableBuilder|knex.ColumnBuilder|knex.QueryBuilder|knex.KnexTimeoutError|knex.ViewBuilder|knex.SchemaBuilder|knex.KnexTimeoutError}
 * @function
 */
function Orm() {

}

/**
 * @type {DbManager}
 */
Orm.instance = null;
/**
 *
 * @type {knex.Client|knex.TableBuilder|knex.ColumnBuilder|knex.QueryBuilder|knex.KnexTimeoutError|knex.ViewBuilder|knex.SchemaBuilder|knex.KnexTimeoutError|Function}
 */
Orm.table = null;


module.exports = lodash.merge(Knex, Orm);


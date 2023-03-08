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
const lodash = require("lodash")
const Knex = require('knex')

/**
 * @field instance {DbManager}
 * @return {knex | (<TRecord=any extends {}, TResult=unknown[]>(config: (Knex.Config | string)) => Knex<TRecord, TResult>) | {Knex: Knex, knex: {<TRecord=any extends {}, TResult=unknown[]>(config: (Knex.Config | string)): Knex<TRecord, TResult>}, readonly default: knex | (<TRecord=any extends {}, TResult=unknown[]>(config: (Knex.Config | string)) => Knex<TRecord, TResult>)|}
 * @constructor
 */
function Orm(){

}
/**
 * @type {DbManager}
 */
Orm.instance = null

module.exports = lodash.merge(Knex,Orm)


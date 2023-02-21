const Orm = require("./Orm")
const {FC} = require("../Index");
const Knex = require("knex");

class DB {


    /**
     *
     * @return {Knex<TRecord, TResult>}
     * @public
     */
    static ConnectionDefaultDb() {
        const configs = FC.Config.Get("database", null)
        if (configs.default && configs.hasOwnProperty(configs.default)) {
            return this.Connection(configs[configs.default], configs.default)
        } else {
            console.warn("Configuration default database not found")
        }

    }

    /**
     *
     * @param config
     * @param client
     * @return {Knex<TRecord, TResult>}
     * @private
     */
    static Connection(config, client = "mysql") {

        if (config === null) {
            throw new Error("Missing database configuration")
        }

        config.log = {
            warn(message) {
                console.warn(message)
            },
            error(message) {
                console.warn(message)
            },
            deprecate(message) {
                console.info(message)
            },
            debug(message) {
                console.debug(message.sql)
            },
        }
        return Knex(config)

    }

    /**
     *
     * @param client
     * @return {Knex<TRecord, TResult>}
     * @public
     */
    static ConnectTo(client) {

        const configs = FC.Config.Get("database", null)

        if (configs.hasOwnProperty(client)) {

            return Knex(configs[client])
        } else {
            console.warn(`Configuration default ${client} not found`)
        }
    }
}

module.exports = DB

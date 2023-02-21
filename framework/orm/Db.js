// @ts-nocheck
const Orm = require("./Orm")
const {Facades} = require("../Index");
const Knex = require("knex");

class DB {
    /**
     * @type {Knex}
     */
    con

    constructor() {
        this.con = this.ConnectionDefaultDb()

    }

    /**
     *
     * @return {Knex}
     * @public
     */
    ConnectionDefaultDb() {
        const configs = Facades.Config.Get("database", null)
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
     * @return {Knex}
     * @constructor
     */
    Connection(config, client = "mysql") {

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
     * @return {Knex}
     * @public
     */
    ConnectTo(client) {

        const configs = Facades.Config.Get("database", null)

        if (configs.hasOwnProperty(client)) {

            return Knex(configs[client])
        } else {
            throw new Error(`Configuration default ${client} not found`)

        }
    }
}

module.exports = DB

const Db = require("../framework/orm/DbManager")
// const facades = require("../framework/facades/Facades");
test("dbtest", () => {
    new Db()._connection({
        client: 'mysql',
        connection: {
            port: 3306,
            host: 'localhost',
            database: 'packages',
            username: 'root',
            password: '123456',
        },
        pool: {
            min: 1,
            max: 1,
        },
        acquireConnectionTimeout: 10000,

    }, "mysql").raw(
        'show status like \'Threads%\''
    ).then(res => {
        console.log(res)
    })
})

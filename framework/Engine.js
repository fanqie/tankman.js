const Web = require("./Web")
const InstallEnv = require("./Config/Env")
const Facades = require("./Facades")

module.exports = class Engine {

    HttpServer = null;
    _Environment = null;
    app = null

    constructor(app) {
        this.app = app
        // console.log(Facades.Config)
    }

    StartUp() {
        this.HttpServer = new Web()
        const port =Facades.Config.Get("APP_PORT")
        this.HttpServer.listen( port|| 8002)
        console.log(`server run in port=${port}`)
        console.log(`web url=http://127.0.0.1:${port}`)
        console.log(`service start success`)
    }


    Env(name) {
        this._Environment.Get(name)
    }

    Install(module) {
        // switch (Object.prototype.toString.name="")
    }
}

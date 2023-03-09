const Application = require("../boot/Application");
const Command = require("./Command");
const {randomUUID} = require("crypto");

class GenerateCommand extends Command {


    /**
     *
     * @param commands {Map<string,Command>}
     * @function
     * @public
     */
    register(commands = new Map()) {
        commands.set("generate:key", this)
    }

    boot() {
        this.setDesc("Generate an APP_KEY for cookies encryption");
        this.appendFlag("force", Boolean, false, "force execute")

    }

    handle() {
        const isForce = this.getFlag("force")

        if (!this.app.Facades.Env.Get("APP_KEY") || isForce) {
            const appKey = randomUUID().replace(/-/ig, "").toUpperCase();
            this.app.Facades.Env.SetAsFile("APP_KEY", appKey)
            this.app.Facades.Log.Info(`APP_KEY Generated successfully, new APP_KEY is '${appKey}'`)
        } else {
            this.app.Facades.Log.Warn("APP_KEY Already exists, no need to regenerate")
        }
    }
}

module.exports = GenerateCommand;

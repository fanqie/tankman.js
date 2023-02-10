const path = require("path");
const fs = require("fs");

module.exports = class Environment {
    envs = new Map()

    constructor(filePath) {
        this._ReadEnv(filePath)
    }

    All(name) {
        return this.envs
    }
    Env(name) {
        return this.envs.get(name)
    }

    Get(name) {
        return this.envs.get(name)
    }

    Set(name, v) {
        this.envs.set(name, v)
    }

    _ReadEnv(filePath) {

        if (!path.isAbsolute(filePath)) {
            filePath = filePath || ".env"
        }
        if(!fs.existsSync(filePath)){
            throw Error(" no found file or directory->>> '127.e'")
        }
        const data = fs.readFileSync(filePath, 'utf-8')
        const reg = new RegExp(/^(\w|\W)+=(\w|\W)?/)
        data.split("\n").forEach(row => {
            if (reg.test(row)) {
                const cols = row.split("=")
                this.envs.set(cols[0].trim(), cols[1] ? cols[1].trim() : "")
            }
        })
    }
}



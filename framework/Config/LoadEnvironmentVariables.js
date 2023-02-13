const path = require("path");
const fs = require("fs");

/**
 *
 */
class LoadEnvironmentVariables {
    /**
     *
     * @param filePath
     * @return {{}}
     * @constructor
     */
    static Load(filePath="") {
        const envs = {}
        if (!path.isAbsolute(filePath)) {
            filePath = filePath || ".env"
        }
        if (!fs.existsSync(filePath)) {
            throw Error(` no found file or directory->>> '${filePath}'`)
        }
        const data = fs.readFileSync(filePath, 'utf-8')
        const reg = new RegExp(/^(\w|\W)+=(\w|\W)?/)
        data.split("\n").forEach(row => {
            if (reg.test(row)) {
                const cols = row.split("=")
                envs[cols[0].trim()] = cols[1] ? cols[1].trim() : ""
            }
        })
        return envs
    }
}


module.exports = LoadEnvironmentVariables

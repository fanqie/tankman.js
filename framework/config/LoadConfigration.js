const path = require("path");
const fs = require("fs");

class LoadConfiguration {
    /**
     *
     * @param filePath
     * @return {{}}
     * @constructor
     */
    static Load(filePath) {
        const Configs = {}
        if (!path.isAbsolute(filePath || "")) {
            filePath = filePath || "config"
        }
        const dirPath = path.join(process.cwd(), filePath)
        if (!fs.existsSync(dirPath)) {
            throw Error(` no found file or directory->>> '${filePath}'`)
        }

        fs.readdirSync(dirPath).filter((filename) => filename.indexOf(".js") > 0).forEach((filename) => {
            const all = require(path.join(dirPath, filename))
            Object.keys(all).forEach((key) => {
                Configs[key] = all[key]
            })
        });
        return Configs;
    }
}

module.exports = LoadConfiguration;

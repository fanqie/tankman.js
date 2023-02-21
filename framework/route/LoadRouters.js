const path = require("path");
const fs = require("fs");

class LoadRouters {
    /**
     *
     * @param filePath
     * @return {{}}
     * @public
     */
    static Load(filePath) {
        if (!path.isAbsolute(filePath || "")) {
            filePath = filePath || "route"
        }
        const dirPath = path.join(process.cwd(), filePath);

        if (!fs.existsSync(dirPath)) {
            throw Error(` no found file or directory->>> '${filePath}'`)
        }

        fs.readdirSync(dirPath).filter((filename) => filename.indexOf(".js") > 0).forEach((filename) => {

            const routeLoadFunc = require(path.join(dirPath, filename));
            routeLoadFunc();
        });

    }
}

module.exports = LoadRouters;

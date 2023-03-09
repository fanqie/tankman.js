const path = require("path");
const fs = require("fs");

/**
 *
 */
class LoadEnvironmentVariables {
    /**
     * @type {RegExp}
     */
    static varReg = new RegExp(/^(\w|\W)+=(\w|\W)?/)

    /**
     *
     * @param filePath
     * @return {{}}
     * @public
     */
    static Load(filePath = "") {
        const envs = {}
        const content = this._GetContent(filePath);
        content.split("\n").forEach(row => {
            if (this.varReg.test(row)) {
                const cols = row.split("=")
                envs[cols[0].trim()] = cols[1] ? cols[1].trim() : ""
            }
        })
        return envs
    }

    /**
     *
     * @param filePath
     * @return string
     * @private
     */
    static _GetContent(filePath) {
        if (!path.isAbsolute(filePath)) {
            filePath = filePath || ".env"
        }
        if (!fs.existsSync(filePath)) {
            throw Error(` no found file or directory->>> '${filePath}'`)
        }
        return fs.readFileSync(filePath, 'utf-8')
    }

    static _SaveContent(filePath, content) {
        if (!path.isAbsolute(filePath)) {
            filePath = filePath || ".env"
        }
        if (!fs.existsSync(filePath)) {
            throw Error(` no found file or directory->>> '${filePath}'`)
        }
        // fs.rmSync(filePath)
        return fs.writeSync(fs.openSync(".env","r+"), content,0,'utf8')
    }

    /**
     *
     * @param name
     * @param value
     * @param filePath
     * @return {*}
     * @function
     */
    static AppendToFile(name, value, filePath = "") {
        const content = this._GetContent("");
        const rows = content.split("\n")
        let i = 0
        do {
            if (this.varReg.test(rows[i])) {
                // .
                const cols = rows[i].split("=")
                if (cols[0].trim() == name) {
                    rows[i] = `${name}=${value}`;
                    this._SaveContent(filePath, rows.join("\n"))
                    return
                }
            }
            i++
        } while (i < rows.length);
        rows.push(`${name}=${value}`)
        this._SaveContent(filePath, rows.join("\n"))

    }

}


module.exports = LoadEnvironmentVariables

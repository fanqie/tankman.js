const path = require('path');
const fs = require('fs');

/**
 *
 */
class LoadEnvironmentVariables {
    /**
     * @type {RegExp}
     */
    static varReg = new RegExp(/^(\w|\W)+=(\w|\W)?/);

    /**
     *
     * @param {string} filePath
     * @return {Object}
     * @public
     */
    static load(filePath = '') {
        const envs = {};
        const content = this._getContent(filePath);
        content.split('\n').forEach((row) => {
            if (this.varReg.test(row)) {
                const cols = row.split('=');
                envs[cols[0].trim()] = cols[1] ? cols[1].trim() : '';
            }
        });
        return envs;
    }

    /**
     *
   * @param {string} filePath
     * @return string
     * @private
     */
    static _getContent(filePath) {
        if (!path.isAbsolute(filePath)) {
            filePath = filePath || '.env';
        }
        if (!fs.existsSync(filePath)) {
            throw Error(` no found file or directory->>> '${filePath}'`);
        }
        return fs.readFileSync(filePath, 'utf-8');
    }

    static _saveContent(filePath, content) {
        if (!path.isAbsolute(filePath)) {
            filePath = filePath || '.env';
        }
        if (!fs.existsSync(filePath)) {
            throw Error(` no found file or directory->>> '${filePath}'`);
        }
        // fs.rmSync(filePath)
        return fs.writeSync(fs.openSync('.env', 'r+'), content, 0, 'utf8');
    }

    /**
     *
     * @param {string} name
     * @param {string} value
     * @param {string} filePath
     * @function
     */
    static appendToFile(name, value, filePath = '') {
        const content = this._getContent('');
        const rows = content.split('\n');
        let i = 0;
        do {
            if (this.varReg.test(rows[i])) {
                // .
                const cols = rows[i].split('=');
                if (cols[0].trim() == name) {
                    rows[i] = `${name}=${value}`;
                    this._saveContent(filePath, rows.join('\n'));
                    return;
                }
            }
            i++;
        } while (i < rows.length);
        rows.push(`${name}=${value}`);
        this._saveContent(filePath, rows.join('\n'));
    }
}


module.exports = LoadEnvironmentVariables;

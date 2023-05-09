const SessionHandlerAbstract = require("./SessionHandlerAbstract");
const path = require("path");
const fs = require("fs");

class FileSessionAdapter extends SessionHandlerAbstract {

    constructor(storeDir = path.join(process.cwd(), ".runtime", "session")) {
        super();
        this.storeDir = storeDir
    }

    /**
     * Renew the expiration time for the given session ID.
     * @param {string} sessionId - The ID of the session to renew.
     * @param {number} [expireTime=0] - The new expiration time in milliseconds. Defaults to 0.
     * @return {void}
     */
    renewTimeBySessionId(sessionId, expireTime = 0) {
        if (expireTime) {
            const fileAbsPath = this._getSessionFile(sessionId)
            const newPath = this._getNewFileAbsPath(fileAbsPath, expireTime);
            if (fs.existsSync(fileAbsPath) && newPath !== fileAbsPath) {
                fs.renameSync(fileAbsPath, newPath)
            }
        }
    }


    /**
     * @param sessionId
     * @return {{}|null}
     *
     */
    getBySessionId(sessionId) {
        const fileAbsPath = this._getSessionFile(sessionId)
        if (fs.existsSync(fileAbsPath)) {
            return JSON.parse(fs.readFileSync(fileAbsPath,{encoding:'utf-8'}));
        }
        return {};

    }

    /**
     * Set a value in the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to set the value for.
     * @param {string} name - The key of the value to set.
     * @param {*} value - The value to set.
     * @param {number} [expireTime=0] - The expiration time in milliseconds for the value. Defaults to 0.
     * @throws {Error} - Method not implemented.
     */
    set(sessionId, name, value, expireTime = 0) {
        if (expireTime) {
            const fileAbsPath = this._getSessionFile(sessionId)
            let sessionData = {}
            if (fs.existsSync(fileAbsPath)) {
                sessionData = JSON.parse(fs.readFileSync(fileAbsPath,{encoding:'utf-8'}));
            }
            sessionData[name] = value;
            const targetPath = this._getFileName(sessionId, expireTime);
            if (targetPath !== fileAbsPath && fs.existsSync(fileAbsPath)) {
                fs.renameSync(fileAbsPath, targetPath)
            }
            this._saveFile(targetPath, sessionData)
        }
    }

    /**
     * Retrieve a value from the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to retrieve the value from.
     * @param {string} name - The key of the value to retrieve.
     * @return {*} - The value, or undefined if the value does not exist.
     */
    get(sessionId, name) {
        const fileAbsPath = this._getSessionFile(sessionId)
        if (fs.existsSync(fileAbsPath) && !this._checkExpired(fileAbsPath)) {
            const sessionData = JSON.parse(fs.readFileSync(fileAbsPath, {encoding: 'utf-8'}));
            return sessionData[name] || null;
        }
        return null;
    }

    /**
     * Remove a value from the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to remove the value from.
     * @param {string} name - The key of the value to remove.
     * @throws {Error} - Method not implemented.
     * @return {void}
     */
    remove(sessionId, name) {
        const fileAbsPath = this._getSessionFile(sessionId)
        if (fs.existsSync(fileAbsPath) && !this._checkExpired(fileAbsPath)) {
            const sessionData = JSON.parse(fs.readFileSync(fileAbsPath,{encoding:'utf-8'}));
            if (sessionData[name]) {
                delete sessionData[name]
            }
            this._saveFile(fileAbsPath, sessionData)
        }
    }

    /**
     * Remove the session data for the given session ID.
     * @param {string} sessionId - The ID of the session to remove.
     */
    removeBySessionId(sessionId) {
        const fileAbsPath = this._getSessionFile(sessionId)
        if (fs.existsSync(fileAbsPath)) {
            fs.unlinkSync(fileAbsPath)
        }

    }

    /**
     * Clear all session data.
     */
    clear() {
        fs.unlinkSync(this.storeDir)
    }

    /**
     * Garbage collect expired session data.
     */
    gc() {
        this._getAllFile().forEach(filename => {
            const filePath = path.join(this.storeDir, filename)
            if (this._checkExpired(filePath) && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath)
            }
        })
    }

    /**
     * Gets the new absolute path of a session file with a new expiration time.
     * @param {string} fileAbsPath - The absolute path of the session file.
     * @param {number} expireTime - The new expiration time in milliseconds.
     * @return {string} - The new absolute path of the session file.
     * @private
     */
    _getNewFileAbsPath(fileAbsPath, expireTime) {
        return path.join(this.storeDir, `${path.parse(fileAbsPath).name}.${expireTime}`)
    }

    _getSessionFile(sessionId) {
        const filename = this._getAllFile().find(filename => sessionId === path.parse(filename).name)
        if (filename) {
            return path.join(this.storeDir, filename)
        } else {
            const tempPath = path.join(this.storeDir, `${sessionId}.0`);
            this._saveFile(tempPath, {});
            return tempPath;
        }

    }


    /**
     * Saves the data of a session to a file.
     * @param {string} fileAbsPath - The absolute path of the session file.
     * @param {Object} sessionData - The session data.
     * @private
     */
    _saveFile(fileAbsPath, sessionData) {
        if (!fs.existsSync(path.dirname(fileAbsPath))) {
            fs.mkdirSync(path.dirname(fileAbsPath), {recursive: true});
        }
        fs.writeFileSync(fileAbsPath, JSON.stringify(sessionData))
    }

    _getExpireTime(filePath) {
        return Number(path.extname(filePath)?.slice(1) || 0)
    }

    _getAllFile() {
        if (fs.existsSync(this.storeDir)) {
            return fs.readdirSync(this.storeDir);
        }
        return [];

    }

    /**
     * Gets the file name of a session file.
     * @param {string} sessionId - The ID of the session.
     * @param {number} [expireTime=0] - The expiration time in milliseconds.
     * @return {string} - The file name of the session file.
     * @private
     */
    _getFileName(sessionId, expireTime = 0) {
        return path.join(this.storeDir, [sessionId, expireTime].join("."))
    }

    /**
     *
     * @param filePath
     * @return {boolean}
     * @private
     */
    _checkExpired(filePath) {
        return Date.now() >= this._getExpireTime(filePath);
    }

}

module.exports = FileSessionAdapter;

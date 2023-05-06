const SessionAdapterAbstract = require("./SessionAdapterAbstract");
const path = require("path");
const fs = require("fs");

class FileSessionAdapter extends SessionAdapterAbstract {

    constructor(storeDir = path.join("storage", ".temp", "session")) {
        super();
        this.storeDir = storeDir
    }

    renewTimeBySessionId(sessionId, expireTime = 0) {
        if (expireTime) {
            const fileAbsPath = this._getSessionFile(sessionId, true)
            fs.renameSync(fileAbsPath, this._getNewFileAbsPath(fileAbsPath, expireTime))
        }
    }


    /**
     * @param sessionId
     * @return {{}|null}
     *
     */
    getBySessionId(sessionId) {
        const fileAbsPath = this._getSessionFile(sessionId, true)
        if (fs.existsSync(fileAbsPath)) {
            return fs.readFileSync(fileAbsPath).toJSON()
        }
        return {};

    }

    set(sessionId, name, value, expireTime = 0) {
        if (expireTime) {
            const fileAbsPath = this._getSessionFile(sessionId, true)
            let sessionData = {}
            if (fs.existsSync(fileAbsPath)) {
                sessionData = fs.readFileSync(fileAbsPath).toJSON();
            }
            sessionData[name] = value;
            const targetPath = this._getFileName(sessionId, expireTime);
            if (targetPath !== fileAbsPath && fs.existsSync(fileAbsPath)) {
                fs.renameSync(fileAbsPath, targetPath)
            }
            this._saveFile(targetPath, sessionData)
        }
    }

    get(sessionId, name) {
        const fileAbsPath = this._getSessionFile(sessionId, true)
        if (fs.existsSync(fileAbsPath) && !this._checkExpired(sessionId)) {
            const sessionData = fs.readFileSync(fileAbsPath).toJSON();
            return sessionData[name] || null;
        }
        return null;
    }

    remove(sessionId, name) {
        const fileAbsPath = this._getSessionFile(sessionId, true)
        if (fs.existsSync(fileAbsPath) && !this._checkExpired(sessionId)) {
            const sessionData = fs.readFileSync(fileAbsPath).toJSON();
            if (sessionData[name]) {
                delete sessionData[name]
            }
            this._saveFile(fileAbsPath, sessionData)
        }
        return null;
    }

    removeBySessionId(sessionId) {
        const fileAbsPath = this._getSessionFile(sessionId, true)
        if (fs.existsSync(fileAbsPath)) {
            fs.unlinkSync(fileAbsPath)
        }
    }

    clear() {
        fs.unlinkSync(this.storeDir)
    }

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
        return path.join(this.storeDir, path.parse(fileAbsPath).name, `.${expireTime}`)
    }

    _getSessionFile(sessionId, abs = false) {
        const filename = this._getAllFile().find(filename => sessionId === path.parse(filename).name)
        return filename && abs ? path.join(this.storeDir, filename) : null;
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
        fs.writeFileSync(fileAbsPath, JSON.stringify(sessionData), {encoding: "utf-8", mode: 755})
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
        return [sessionId, expireTime].join(".")
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

export = FileSessionAdapter;
declare class FileSessionAdapter extends SessionHandlerAbstract {
    constructor(storeDir?: string);
    storeDir: string;
    /**
     * @param sessionId
     * @return {{}|null}
     *
     */
    getBySessionId(sessionId: any): {} | null;
    /**
     * Gets the new absolute path of a session file with a new expiration time.
     * @param {string} fileAbsPath - The absolute path of the session file.
     * @param {number} expireTime - The new expiration time in milliseconds.
     * @return {string} - The new absolute path of the session file.
     * @private
     */
    private _getNewFileAbsPath;
    _getSessionFile(sessionId: any): string;
    /**
     * Saves the data of a session to a file.
     * @param {string} fileAbsPath - The absolute path of the session file.
     * @param {Object} sessionData - The session data.
     * @private
     */
    private _saveFile;
    _getExpireTime(filePath: any): number;
    _getAllFile(): string[];
    /**
     * Gets the file name of a session file.
     * @param {string} sessionId - The ID of the session.
     * @param {number} [expireTime=0] - The expiration time in milliseconds.
     * @return {string} - The file name of the session file.
     * @private
     */
    private _getFileName;
    /**
     *
     * @param filePath
     * @return {boolean}
     * @private
     */
    private _checkExpired;
}
import SessionHandlerAbstract = require("./SessionHandlerAbstract");

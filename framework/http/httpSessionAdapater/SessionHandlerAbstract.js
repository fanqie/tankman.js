/**
 * Abstract class representing a session adapter.
 * @abstract
 */
class SessionHandlerAbstract {
    constructor() {
        if (new.target === SessionHandlerAbstract) {
            throw new TypeError('Cannot construct abstract instances directly');
        }
    }



    /**
     * Renew the expiration time for the given session ID.
     * @param {string} sessionId - The ID of the session to renew.
     * @param {number} [expireTime=0] - The new expiration time in milliseconds. Defaults to 0.
     * @throws {Error} - Method not implemented.
     * @return {void}
     */
    renewTimeBySessionId(sessionId, expireTime = 0) {
        throw new Error('Method not implemented')
    }

    /**
     * Retrieve the session data for the given session ID.
     * @param {string} sessionId - The ID of the session to retrieve.
     * @return {Object|null} - The session data, or null if the session does not exist.
     * @throws {Error} - Method not implemented.
     */
    getBySessionId(sessionId) {
        throw new Error('Method not implemented')
    }

    /**
     * Set a value in the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to set the value for.
     * @param {string} name - The key of the value to set.
     * @param {*} value - The value to set.
     * @param {number} [expireTime=0] - The expiration time in milliseconds for the value. Defaults to 0.
     * @throws {Error} - Method not implemented.
     * @return {void}
     */
    set(sessionId, name, value, expireTime = 0) {
        throw new Error('Method not implemented')
    }

    /**
     * Retrieve a value from the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to retrieve the value from.
     * @param {string} name - The key of the value to retrieve.
     * @return {*} - The value, or undefined if the value does not exist.
     * @throws {Error} - Method not implemented.
     */
    get(sessionId, name) {
        throw new Error('Method not implemented')
    }

    /**
     * Remove a value from the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to remove the value from.
     * @param {string} name - The key of the value to remove.
     * @throws {Error} - Method not implemented.
     * @return {void}
     */
    remove(sessionId, name) {
        throw new Error('Method not implemented')
    }

    /**
     * Remove the session data for the given session ID.
     * @param {string} sessionId - The ID of the session to remove.
     * @throws {Error} - Method not implemented.
     * @return {void}
     */
    removeBySessionId(sessionId) {
        throw new Error('Method not implemented')
    }

    /**
     * Clear all session data.
     * @throws {Error} - Method not implemented.
     * @return {void}
     */
    clear() {
        throw new Error('Method not implemented')
    }

    /**
     * Garbage collect expired session data.
     * @throws {Error} - Method not implemented.
     * @return {void}
     */
    gc() {
        throw new Error('Method not implemented')
    }
}

// Export the abstract class
module.exports = SessionHandlerAbstract;

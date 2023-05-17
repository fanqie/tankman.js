export = SessionHandlerAbstract;
/**
 * Abstract class representing a session adapter.
 * @abstract
 */
declare class SessionHandlerAbstract {
    /**
     * Renew the expiration time for the given session ID.
     * @param {string} sessionId - The ID of the session to renew.
     * @param {number} [expireTime=0] - The new expiration time in milliseconds. Defaults to 0.
     * @throws {Error} - Method not implemented.
     * @return {Promise<void>}
     */
    renewTimeBySessionId(sessionId: string, expireTime?: number): Promise<void>;
    /**
     * Retrieve the session data for the given session ID.
     * @param {string} sessionId - The ID of the session to retrieve.
     * @return {Promise<*>} - The session data, or null if the session does not exist.
     * @throws {Error} - Method not implemented.
     */
    getBySessionId(sessionId: string): Promise<any>;
    /**
     * Set a value in the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to set the value for.
     * @param {string} name - The key of the value to set.
     * @param {*} value - The value to set.
     * @param {number} [expireTime=0] - The expiration time in milliseconds for the value. Defaults to 0.
     * @throws {Error} - Method not implemented.
     * @return {Promise<void>}
     */
    set(sessionId: string, name: string, value: any, expireTime?: number): Promise<void>;
    /**
     * Retrieve a value from the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to retrieve the value from.
     * @param {string} name - The key of the value to retrieve.
     * @return {Promise<*>} - The value, or undefined if the value does not exist.
     * @throws {Error} - Method not implemented.
     */
    get(sessionId: string, name: string): Promise<any>;
    /**
     * Remove a value from the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to remove the value from.
     * @param {string} name - The key of the value to remove.
     * @throws {Error} - Method not implemented.
     * @return {Promise<void>}
     */
    remove(sessionId: string, name: string): Promise<void>;
    /**
     * Remove the session data for the given session ID.
     * @param {string} sessionId - The ID of the session to remove.
     * @throws {Error} - Method not implemented.
     * @return {Promise<void>}
     */
    removeBySessionId(sessionId: string): Promise<void>;
    /**
     * Clear all session data.
     * @throws {Error} - Method not implemented.
     * @return {Promise<void>}
     */
    clear(): Promise<void>;
    /**
     * Garbage collect expired session data.
     * @throws {Error} - Method not implemented.
     * @return {Promise<void>}
     */
    gc(): Promise<void>;
}

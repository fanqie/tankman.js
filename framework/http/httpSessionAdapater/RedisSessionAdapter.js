const SessionHandlerAbstract = require("./SessionHandlerAbstract");
const RedisAdapter = require("../../cache/adapter/RedisAdapter");

class RedisSessionAdapter extends SessionHandlerAbstract {
    /**
     *
     * @type {RedisAdapter}
     */
    redisCache = null;

    constructor(redisAdapter) {
        super();
        this.redisCache = redisAdapter
    }

    /**
     * Renew the expiration time for the given session ID.
     * @param {string} sessionId - The ID of the session to renew.
     * @param {number} [expireTime=0] - The new expiration time in milliseconds. Defaults to 0.
     * @return {Promise<void>}
     */
    async renewTimeBySessionId(sessionId, expireTime = 0) {
        if (expireTime && sessionId) {
            await this.redisCache.setTtl(`${sessionId}_*`, this._calcTheRemainingSeconds(expireTime)).then(res => {
            })
        }
    }


    /**
     * @param sessionId
     * @return {Promise<*>}
     */
    async getBySessionId(sessionId) {
        const values = await this.redisCache.get(`${sessionId}_*`)
        return values;
    }

    /**
     * Set a value in the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to set the value for.
     * @param {string} name - The key of the value to set.
     * @param {*} value - The value to set.
     * @param {number} [expireTime=0] - The expiration time in milliseconds for the value. Defaults to 0.
     * @return {Promise<void>}
     */
    async set(sessionId, name, value, expireTime = 0) {
        await this.redisCache.set(this._makeKey(sessionId, name), value, this._calcTheRemainingSeconds(expireTime))
    }

    /**
     * _calcTheRemainingSeconds calculate the remaining seconds
     * @param expireTime
     * @return {number}
     * @private
     */
    _calcTheRemainingSeconds(expireTime) {
        return (expireTime - Date.now()) / 1000;
    }

    /**
     * _makeKey make key by session id and name
     * @param sessionId
     * @param name
     * @return {string}
     * @private
     */
    _makeKey(sessionId, name) {
        return `${sessionId}_${name}`
    }

    /**
     * Retrieve a value from the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to retrieve the value from.
     * @param {string} name - The key of the value to retrieve.
     * @return {Promise<*>} - The value retrieved.
     */
    async get(sessionId, name) {
        return await this.redisCache.get(this._makeKey(sessionId, name))
    }

    /**
     * Remove a value from the session data for the given session ID and key.
     * @param {string} sessionId - The ID of the session to remove the value from.
     * @param {string} name - The key of the value to remove.
     * @return {Promise<void>}
     */
    async remove(sessionId, name) {
        await this.redisCache.forget(this._makeKey(sessionId, name))
    }

    /**
     * removeBySessionId remove all session data by session id
     * @param  {string} sessionId
     */
    async removeBySessionId(sessionId) {
        await this.redisCache.forget(`${sessionId}_*`)

    }

    /**
     * Clear all session data.
     */
    async clear() {
        await this.redisCache.flush();
    }

    /**
     * Garbage collect expired session data.
     */
    async gc() {
        //not need
    }


}

module.exports = RedisSessionAdapter;

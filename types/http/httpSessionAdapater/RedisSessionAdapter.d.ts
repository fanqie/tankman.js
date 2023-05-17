export = RedisSessionAdapter;
declare class RedisSessionAdapter extends SessionHandlerAbstract {
    constructor(redisAdapter: any);
    /**
     *
     * @type {RedisAdapter}
     */
    redisCache: RedisAdapter;
    /**
     * _calcTheRemainingSeconds calculate the remaining seconds
     * @param expireTime
     * @return {number}
     * @private
     */
    private _calcTheRemainingSeconds;
    /**
     * _makeKey make key by session id and name
     * @param sessionId
     * @param name
     * @return {string}
     * @private
     */
    private _makeKey;
}
import SessionHandlerAbstract = require("./SessionHandlerAbstract");
import RedisAdapter = require("../../cache/adapter/RedisAdapter");

// Define abstract SessionAdapter class
const fs = require("fs");
const path = require("path");

class SessionAdapterAbstract {
    constructor() {
        if (new.target === SessionAdapterAbstract) {
            throw new TypeError('Cannot construct abstract instances directly');
        }
    }

    renewTimeBySessionId(sessionId, expireTime = 0) {
        throw new Error('Method not implemented')
    }


    /**
     * @param sessionId
     * @return {{}|null}
     *
     */
    getBySessionId(sessionId) {
        throw new Error('Method not implemented')

    }

    set(sessionId, name, value, expireTime = 0) {
        throw new Error('Method not implemented')
    }

    get(sessionId, name) {
        throw new Error('Method not implemented')
    }

    remove(sessionId, name) {
        throw new Error('Method not implemented')
    }

    removeBySessionId(sessionId) {
        throw new Error('Method not implemented')
    }

    clear() {
        throw new Error('Method not implemented')
    }

    gc() {
        throw new Error('Method not implemented')
    }
}

// Export the abstract class
module.exports = SessionAdapterAbstract;

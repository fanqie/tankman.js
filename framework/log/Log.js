/** @typedef {typeof import('log4js')} Log4jS */
const log4js = require('log4js');
const facades = require('../facades/Facades');

class Log {
    /**
     *
     * @type  {Log4jS}
     */
    log4js;

    constructor(config) {
        this.log4js = log4js;
    }

    /**
     *
     * @param {Object} options
     * @public
     */
    setConfig(options) {
        this.log4js.configure({...facades.config.get('log'), ...options});
    }

    // eslint-disable-next-line valid-jsdoc
    /**
     * @param {String} [category=""]
     * @return {import('log4js').Logger}
     * @public
     */
    getLogger(category='') {
        try {
            return this.log4js.getLogger(category || 'default');
        } catch (e) {
            return this.log4js.getLogger('default');
        }
    }

    /**
     * @param {any} callback
     * @constructor
     */
    shudown(callback) {
        return this.log4js.shutdown(callback);
    }

    /**
     *
     * @param {string} type
     * @param {any} fn
     * @constructor
     */
    addLayout(type, fn) {
        return this.log4js.addLayout(type, fn);
    }

    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    trace(message, category) {
        this.getLogger(category).trace(message || '');
    }

    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    debug(message, category) {
        this.getLogger(category).debug(message || '');
    }

    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    info(message, category = '') {
        this.getLogger(category).info(message || '');
    }

    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    warn(message, category) {
        this.getLogger(category).warn(message || '');
    }

    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    error(message, category) {
        this.getLogger(category || '').error(message || '');
    }

    /**
     *
     * @param {*} message
     * @param {string} [category=""]
     * @public
     */
    fatal(message, category) {
        this.getLogger(category || '').fatal(message || '');
    }

    /**
     *
     * @param {*} message
     * @public
     */
    traceHttp(message) {
        this.getLogger('http').trace(message || '');
    }

    /**
     *
     * @param {*} message
     * @public
     */
    debugHttp(message) {
        this.getLogger('http').debug(message || '');
    }

    /**
     *
     * @param {*} message
     * @public
     */
    infoHttp(message = '') {
        this.getLogger('http').info(message || '');
    }

    /**
     *
     * @param {*} message
     * @public
     */
    warnHttp(message) {
        this.getLogger('http').warn(message || '');
    }

    /**
     *
     * @param {*} message
     * @public
     */
    errorHttp(message) {
        this.getLogger('http').error(message || '');
    }

    /**
     *
     * @param {*} message
     * @public
     */
    fatalHttp(message) {
        this.getLogger('http').fatal(message || '');
    }
}

module.exports = Log;

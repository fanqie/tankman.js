/** @typedef {typeof import('./boot/Application')} Application */
/** @typedef {typeof import('./Facades')} Facades */
/** @typedef {typeof import('./http/Engine')} Engine */
module.exports = {
    /**
     * @type {Application}
     */
    Application: require("./boot/Application"),
    /**
     * @type {Facades}
     */
    FC: require("./Facades"),
    /**
     * @type {Engine}
     */
    Engine: require("./http/Engine")
}


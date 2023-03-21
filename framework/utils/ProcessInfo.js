const path = require('path');

module.exports = class ProcessInfo {
    /**
     *
     * @type {string[]}
     */
    args = [];
    /**
     *
     * @type {{}}
     */
    versions = {};
    /**
     *
     * @type {{}}
     */
    osEnv = {};
    /**
     *
     * @type {Map}
     */
    flags = new Map();

    /**
     *
     * @type {{}}
     */
    features = {};
    /**
     *
     * @type {string}
     */
    arch = 'x64';
    /**
     *
     * @type {string}
     */
    nodeVersion = '';
    /**
     *
     * @type {number}
     */
    pid = 0;
    /**
     *
     * @type {number}
     */
    ppid = 0;
    /**
     *
     * @type {string}
     */
    execPath = '';
    /**
     *
     * @type {number}
     */
    debugPort = 0;
    /**
     *
     * @type {string}
     */
    argv0 = '';

    /**
     *
     */
    constructor() {
        this.parse(process.argv);
        this.versions = {...process.versions};
        this.osEnv = {...process.env};
        this.features = {...process.features};
        this.arch = process.arch;
        this.Platform = process.platform;
        this.nodeVersion = process.version;
        this.pid = process.pid;
        this.ppid = process.ppid;
        this.execPath = process.execPath;
        this.debugPort = process.debugPort;
        this.argv0 = process.argv0;
    }

    /**
     *
     * @param {string[]} args
     */
    parse(args) {
        args.forEach((arg) => {
            if (arg.indexOf('=') > 0) {
                const values = arg.split('=');

                this.flags.set(values[0], values[1] || '');
            } else if (!path.isAbsolute(arg)) {
                this.args.push(arg);
            }
        });
    }
};

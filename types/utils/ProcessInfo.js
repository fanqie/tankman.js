const path = require("path");
/**
 * ProcessInfo class
 */
class ProcessInfo {
    /**
     *
     */
    constructor() {
        /**
         *
         * @type {string[]}
         */
        this.Args = [];
        /**
         *
         * @type {{}}
         */
        this.Versions = {};
        /**
         *
         * @type {{}}
         */
        this.OsEnv = {};
        /**
         *
         * @type {Map}
         */
        this.Flags = new Map();
        /**
         *
         * @type {{}}
         */
        this.Features = {};
        /**
         *
         * @type {string}
         */
        this.Arch = "x64";
        /**
         *
         * @type {string}
         */
        this.NodeVersion = "";
        /**
         *
         * @type {number}
         */
        this.Pid = 0;
        /**
         *
         * @type {number}
         */
        this.Ppid = 0;
        /**
         *
         * @type {string}
         */
        this.ExecPath = '';
        /**
         *
         * @type {number}
         */
        this.DebugPort = 0;
        /**
         *
         * @type {string}
         */
        this.Argv0 = '';
        this.parse(process.argv);
        this.Versions = Object.assign({}, process.versions);
        this.OsEnv = Object.assign({}, process.env);
        this.Features = Object.assign({}, process.features);
        this.Arch = process.arch;
        this.Platform = process.platform;
        this.NodeVersion = process.version;
        this.Pid = process.pid;
        this.Ppid = process.ppid;
        this.ExecPath = process.execPath;
        this.DebugPort = process.debugPort;
        this.Argv0 = process.argv0;
    }
    /**
     *
     * @param args {string[]}
     */
    parse(args) {
        args.forEach(arg => {
            if (arg.indexOf("=") > 0) {
                const values = arg.split("=");
                this.Flags.set(values[0], values[1] || "");
            }
            else if (!path.isAbsolute(arg)) {
                this.Args.push(arg);
            }
        });
    }
}
module.exports = ProcessInfo;

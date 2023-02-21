const path = require("path");

/**
 * ProcessInfo class
 */
class ProcessInfo {
    /**
     *
     * @type {string[]}
     */
    Args = []
    /**
     *
     * @type {{}}
     */
    Versions = {}
    /**
     *
     * @type {{}}
     */
    OsEnv = {}
    /**
     *
     * @type {Map}
     */
    Flags = new Map()

    /**
     *
     * @type {{}}
     */
    Features = {}
    /**
     *
     * @type {string}
     */
    Arch = "x64"
    /**
     *
     * @type {string}
     */
    NodeVersion = ""
    /**
     *
     * @type {number}
     */
    Pid = 0
    /**
     *
     * @type {number}
     */
    Ppid = 0
    /**
     *
     * @type {string}
     */
    ExecPath = ''
    /**
     *
     * @type {number}
     */
    DebugPort = 0
    /**
     *
     * @type {string}
     */
    Argv0 = ''

    /**
     *
     */
    constructor() {
        this.parse(process.argv)
        this.Versions = {...process.versions}
        this.OsEnv = {...process.env}
        this.Features = {...process.features}
        this.Arch = process.arch
        this.Platform = process.platform
        this.NodeVersion = process.version
        this.Pid = process.pid
        this.Ppid = process.ppid
        this.ExecPath = process.execPath
        this.DebugPort = process.debugPort
        this.Argv0 = process.argv0
    }

    /**
     *
     * @param args {string[]}
     */
    parse(args) {
        args.forEach(arg => {
            if (arg.indexOf("=") > 0) {
                const values = arg.split("=")

                this.Flags.set(values[0], values[1] || "")

            } else if (!path.isAbsolute(arg)) {
                this.Args.push(arg)
            }

        })
    }
}

module.exports = ProcessInfo

const path = require("path");

module.exports = class ProcessInfo {
    Args = []
    Versions = {}
    OsEnv = {}
    Flags = new Map()
    Features = {}
    Arch = "x64"
    NodeVersion = ""
    Pid = 0
    Ppid = 0
    ExecPath = ''
    DebugPort = 0
    Argv0 = ''

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

export = ProcessInfo;
/**
 * ProcessInfo class
 */
declare class ProcessInfo {
    /**
     *
     * @type {string[]}
     */
    Args: string[];
    /**
     *
     * @type {{}}
     */
    Versions: {};
    /**
     *
     * @type {{}}
     */
    OsEnv: {};
    /**
     *
     * @type {Map}
     */
    Flags: Map<any, any>;
    /**
     *
     * @type {{}}
     */
    Features: {};
    /**
     *
     * @type {string}
     */
    Arch: string;
    /**
     *
     * @type {string}
     */
    NodeVersion: string;
    /**
     *
     * @type {number}
     */
    Pid: number;
    /**
     *
     * @type {number}
     */
    Ppid: number;
    /**
     *
     * @type {string}
     */
    ExecPath: string;
    /**
     *
     * @type {number}
     */
    DebugPort: number;
    /**
     *
     * @type {string}
     */
    Argv0: string;
    Platform: NodeJS.Platform;
    /**
     *
     * @param args {string[]}
     */
    parse(args: string[]): void;
}

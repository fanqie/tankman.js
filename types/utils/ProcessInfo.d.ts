export = ProcessInfo;
declare class ProcessInfo {
    /**
     *
     * @type {string[]}
     */
    args: string[];
    /**
     *
     * @type {{}}
     */
    versions: {};
    /**
     *
     * @type {{}}
     */
    osEnv: {};
    /**
     *
     * @type {Map}
     */
    flags: Map<any, any>;
    /**
     *
     * @type {{}}
     */
    features: {};
    /**
     *
     * @type {string}
     */
    arch: string;
    /**
     *
     * @type {string}
     */
    nodeVersion: string;
    /**
     *
     * @type {number}
     */
    pid: number;
    /**
     *
     * @type {number}
     */
    ppid: number;
    /**
     *
     * @type {string}
     */
    execPath: string;
    /**
     *
     * @type {number}
     */
    debugPort: number;
    /**
     *
     * @type {string}
     */
    argv0: string;
    Platform: NodeJS.Platform;
    /**
     *
     * @param {string[]} args
     */
    parse(args: string[]): void;
}

export = Command;
declare class Command {
    /**
     * @param {Application} app
     */
    constructor(app: Application);
    /**
     * @param app {Application}
     */
    app: Application;
    /**
     * @type {Map<string, {type:BooleanConstructor|StringConstructor|NumberConstructor,defaultVal:string|Number|Boolean|null,desc:String}>}
     */
    flags: Map<string, {
        type: BooleanConstructor | StringConstructor | NumberConstructor;
        defaultVal: string | number | boolean | null;
        desc: string;
    }>;
    /**
     *
     * @type {string[]}
     */
    args: string[];
    /**
     *
     * @type {string}
     */
    desc: string;
    /**
     *
     * @param {Map<string,Command>} commands
     */
    register(commands: Map<string, Command>): void;
    /**
   *
   */
    boot(): void;
    setDesc(desc: any): void;
    getDesc(): string;
    /**
     * @return {Command}
     */
    parse(): Command;
    handle(): void;
    /**
     * append flag
     * @param {string} name
     * @param {BooleanConstructor|StringConstructor|NumberConstructor} type
     * @param {string|Number|Boolean|null} defaultVal
     * @param {string} desc
     */
    appendFlag(name: string, type: BooleanConstructor | StringConstructor | NumberConstructor, defaultVal: string | number | boolean | null, desc: string): void;
    /**
     * getArgs
     * @return {string[]}
     */
    getArgs(): string[];
    /**
     * @param {string} name
     * @function
     * @return {string|number|boolean|*}
     * @protected
     */
    protected getFlag(name: string): string | number | boolean | any;
    help(): string;
}
import Application = require("../boot/Application");

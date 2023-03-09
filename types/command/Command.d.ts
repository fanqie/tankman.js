export = Command;
declare class Command {
    /**
     * @param app {Application}
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
     * @param commands {Map<string,Command>}
     */
    register(commands: Map<string, Command>): void;
    setDesc(desc: any): void;
    getDesc(): string;
    /**
     * @return {Command}
     */
    parse(): Command;
    handle(): void;
    /**
     * append flag
     * @param name {string}
     * @param type {BooleanConstructor|StringConstructor|NumberConstructor}
     * @param defaultVal {string|Number|Boolean|null}
     * @param desc {string}
     */
    appendFlag(name: string, type: BooleanConstructor | StringConstructor | NumberConstructor, defaultVal: string | number | boolean | null, desc: string): void;
    /**
     * getArgs
     * @return {string[]}
     */
    getArgs(): string[];
    /**
     *
     * @param name
     * @function
     * @return string|number|boolean
     * @protected
     */
    protected getFlag(name: any): string | number | boolean;
    help(): string;
}
import Application = require("../boot/Application");

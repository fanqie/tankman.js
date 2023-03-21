const Application = require('../boot/Application');
const crypto = require('crypto');

class Command {
    /**
     * @param app {Application}
     */
    app;
    /**
     * @type {Map<string, {type:BooleanConstructor|StringConstructor|NumberConstructor,defaultVal:string|Number|Boolean|null,desc:String}>}
     */
    flags = new Map();
    /**
     *
     * @type {string[]}
     */
    args = [];
    /**
     *
     * @type {string}
     */
    desc = '';

    /**
     * @param {Application} app
     */
    constructor(app) {
        this.app = app;
    }

    /**
     *
     * @param {Map<string,Command>} commands
     */
    register(commands) {
    // demo: commands.set("generate:key", this)
    }

    /**
   *
   */
    boot() {
    }
    setDesc(desc) {
        this.desc = desc;
    }

    getDesc() {
        return this.desc;
    }

    /**
     * @return {Command}
     */
    parse() {
        this.args = this.getArgs();
        return this;
    }

    handle() {
    // callFunction

    }

    /**
     * append flag
     * @param {string} name
     * @param {BooleanConstructor|StringConstructor|NumberConstructor} type
     * @param {string|Number|Boolean|null} defaultVal
     * @param {string} desc
     */
    appendFlag(name, type, defaultVal, desc) {
        this.flags.set(name, {
            type,
            defaultVal,
            desc,
        });
    }

    /**
     * getArgs
     * @return {string[]}
     */
    getArgs() {
        const args = process.argv.slice(2);
        return args.filter((arg) => arg && arg.indexOf('--') === -1).slice(1);
    }

    /**
     * @param {string} name
     * @function
     * @return string|number|boolean
     * @protected
     */
    getFlag(name) {
        if (!this.flags.has(name)) {
            throw new Error('flags error:Undefined ' + name);
        }
        const flagDefine = this.flags.get(name);
        const args = process.argv.slice(2);
        for (const arg of args) {
            if (arg && arg.indexOf('--') === 0) {
                const flag = arg.replace('--', '').split('=');

                if (flag[0].trim() === name) {
                    const value = flag[1];
                    if (!value) {
                        break;
                    }
                    value.trim().length > 0 ? value.trim() : flagDefine.defaultVal.toString();
                    switch (flagDefine.type.name) {
                    case 'Number':
                        return Number(value);
                    case 'Boolean':
                        return value === 'true';
                    default:
                        // string any
                        return value;
                    }
                }
            }
        }
        return flagDefine.defaultVal;
    }

    help() {
        const rows = ['----------------------flags----------------------'];

        this.flags.forEach((flag, key) => {
            rows.push(`--${key}=<${flag.type.name}> \t default:(${flag.defaultVal})  \t${flag.desc}`);
        });
        return rows.join('\n');
    }
}
module.exports = Command;

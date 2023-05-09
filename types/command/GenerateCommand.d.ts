export = GenerateCommand;
declare class GenerateCommand extends Command {
    /**
     *
     * @param {Map<string,Command>} commands
     * @function
     * @public
     */
    public register(commands?: Map<string, Command>): void;
}
import Command = require("./Command");

export = GenerateCommand;
declare class GenerateCommand extends Command {
    /**
     *
     * @param commands {Map<string,Command>}
     * @function
     * @public
     */
    public register(commands?: Map<string, Command>): void;
}
import Command = require("./Command");

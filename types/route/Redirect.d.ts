export = Redirect;
declare class Redirect extends Router {
    /**
     *
     * @param {{middleware: *[], prefix: string}} options
     * @param {string} vPath
     * @param  {string} redirectUrl
     */
    constructor(options: {
        middleware: any[];
        prefix: string;
    }, vPath: string, redirectUrl: string);
}
import Router = require("./Router");

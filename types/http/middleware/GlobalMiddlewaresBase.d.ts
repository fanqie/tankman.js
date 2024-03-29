export = GlobalMiddlewaresBase;
declare class GlobalMiddlewaresBase extends Middleware {
    constructor(options?: {});
    /**
     * @type {{regexp: RegExp, allowHeaders: string, except:(string|RegExp)[]}}
     */
    options: {
        regexp: RegExp;
        allowHeaders: string;
        except: (string | RegExp)[];
    };
}
import Middleware = require("./Middleware");

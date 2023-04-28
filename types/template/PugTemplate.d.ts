export = PugTemplate;
/**
 * PugTemplate class.
 * @class
 * @extends TemplateEngineAbstract
 */
declare class PugTemplate extends TemplateEngineAbstract {
    /**
     * Render a template file.
     * @function
     * @param {string} filename - The path to the template file to render.
     * @param {Object} data - The data object to use for rendering the template.
     * @param {Object} [options] - The options object to use when rendering the template.
     * @return {string} - The rendered string.
     */
    renderFile(filename: string, data: any, options?: any): string;
    /**
     *
     * @return {{name?: string, runtime?: *, cache?: {}|*, filters?: {}|*, compile?: function(*, *): *, compileClientWithDependenciesTracked?: function(*, *): {body: string, dependencies: []}, compileClient?: function(String, Options): String, compileFile?: function(String, {}): *, render?: function(*, *, *): (*), renderFile?: function(*, *, *): (*), compileFileClient?: function(*, *): (*), __express?: function(*, *, *): void}}
     */
    getOrigin(): {
        name?: string;
        runtime?: any;
        cache?: {} | any;
        filters?: {} | any;
        compile?: (arg0: any, arg1: any) => any;
        compileClientWithDependenciesTracked?: (arg0: any, arg1: any) => {
            body: string;
            dependencies: [];
        };
        compileClient?: (arg0: string, arg1: Options) => string;
        compileFile?: (arg0: string, arg1: {}) => any;
        render?: (arg0: any, arg1: any, arg2: any) => (any);
        renderFile?: (arg0: any, arg1: any, arg2: any) => (any);
        compileFileClient?: (arg0: any, arg1: any) => (any);
        __express?: (arg0: any, arg1: any, arg2: any) => void;
    };
}
import TemplateEngineAbstract = require("./TemplateEngineAbstract");

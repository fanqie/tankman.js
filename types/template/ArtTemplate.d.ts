export = ArtTemplate;
/**
 * Define the ArtTemplate subclass, which inherits from TemplateEngine
 * @class
 * @extends TemplateEngineAbstract
 */
declare class ArtTemplate extends TemplateEngineAbstract {
    /**
     * Render a template
     * @param {string} source - The template string
     * @param {Object} data - The data to render the template with
     * @param {Object} options - The options to render the template with
     * @return {string} - The rendered string
     */
    render(source: string, data: any, options: any): string;
    /**
     * Compile a template
     * @param {string} source - The template string
     * @param {Object} options - The options to compile the template with
     * @return {Function|*}
     */
    compile(source: string, options: any): Function | any;
    /**
     * Load and render a template file
     * @param {string} filename - The path to the template file
     * @param {Object} data - The data to render the template with
     * @return {*}
     */
    renderFile(filename: string, data: any): any;
    /**
     * Get the art-template module itself, for calling other methods
     * @return {artTemplate|any}
     * @function
     */
    getOrigin(): typeof artTemplate | any;
}
import TemplateEngineAbstract = require("./TemplateEngineAbstract");
import artTemplate = require("art-template");

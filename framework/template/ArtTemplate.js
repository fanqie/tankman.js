const TemplateEngineAbstract = require("./TemplateEngineAbstract");
const artTemplate = require('art-template');

/**
 * Define the ArtTemplate subclass, which inherits from TemplateEngine
 * @class
 * @extends TemplateEngineAbstract
 */
class ArtTemplate extends TemplateEngineAbstract {
    suffix = '.art';
    /**
     * Render a template
     * @param {string} source - The template string
     * @param {Object} data - The data to render the template with
     * @param {Object} options - The options to render the template with
     * @return {string} - The rendered string
     */
    render(source, data, options) {
        return this.getOrigin().render(source, data, options);
    }

    /**
     * Compile a template
     * @param {string} source - The template string
     * @param {Object} options - The options to compile the template with
     * @return {Function|*}
     */
    compile(source, options) {
        return this.getOrigin().compile(source, options);
    }

    /**
     * Load and render a template file
     * @param {string} filename - The path to the template file
     * @param {Object} data - The data to render the template with
     * @return {*}
     */
    renderFile(filename, data) {
        return this.getOrigin()(this.convertFilePath(filename), data);
    }

    /**
     * Get the art-template module itself, for calling other methods
     * @return {artTemplate|any}
     * @function
     */
    getOrigin() {
        return artTemplate;
    }
}

module.exports = ArtTemplate;

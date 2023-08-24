const TemplateEngineAbstract = require('./TemplateEngineAbstract');
const pugTemplate = require('pug');
/**
 * PugTemplate class.
 * @class
 * @extends TemplateEngineAbstract
 */
class PugTemplate extends TemplateEngineAbstract {
    suffix = '.pug';
    /**
     * Render a template string.
     * @function
     * @param {string} source - The template string to render.
     * @param {Object} data - The data object to use for rendering the template.
     * @param {Object} [options] - The options object to use when rendering the template.
     * @return {string} - The rendered string.
     */
    render(source, data, options) {
        const func = this.getOrigin().compile(source, options);
        return func(data);
    }

    /**
     * Compile a template string.
     * @function
     * @param {string} source - The template string to compile.
     * @param {Object} [options] - The options object to use when compiling the template.
     * @return {Function} - The compiled template function.
     */
    compile(source, options) {
        return this.getOrigin().compile(source, options);
    }

    /**
     * Render a template file.
     * @function
     * @param {string} filename - The path to the template file to render.
     * @param {Object} data - The data object to use for rendering the template.
     * @param {Object} [options] - The options object to use when rendering the template.
     * @return {string|*} - The rendered string.
     */
    renderFile(filename, data, options) {
        const func = this.getOrigin().compileFile(this.convertFilePath(filename), options);
        return func(data);
    }

    // eslint-disable-next-line valid-jsdoc
    /**
     *
     * @return {{name?: string, runtime?: *, cache?: {}|*, filters?: {}|*, compile?: function(*, *): *, compileClientWithDependenciesTracked?: function(*, *): {body: string, dependencies: []}, compileClient?: function(String, Options): String, compileFile?: function(String, {}): *, render?: function(*, *, *): (*), renderFile?: function(*, *, *): (*), compileFileClient?: function(*, *): (*), __express?: function(*, *, *): void}}
     */
    getOrigin() {
        return pugTemplate;
    }
}

module.exports = PugTemplate;

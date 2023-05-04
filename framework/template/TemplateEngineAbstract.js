const path = require('path');
const TemplateFileCache = require('./TemplateFileCache');

/**
 * TemplateEngineAbstract abstract class.
 * @class
 */
class TemplateEngineAbstract {
    /**
     * The file suffix used by this template engine.
     * @type {string}
     */
    suffix = '.art';

    /**
     * The directory where templates are stored.
     * @type {string}
     */
    templateDir = 'views';
    /**
     * @type {boolean}
     */
    enableFileCache = false;

    /**
     * Create a new instance of the TemplateEngineAbstract class.
     * @constructor
     * @throws {TypeError} - Cannot construct abstract instances directly.
     */
    constructor() {
        if (new.target === TemplateEngineAbstract) {
            throw new TypeError('Cannot construct abstract instances directly');
        }
    }

    setEnableFileCache(enable = false) {
        this.enableFileCache = enable;
    }

    setMaxLife(maxLife) {
        TemplateFileCache.setMaxLife(maxLife)
    }

    disableFileCache() {
        this.templateFileCache = null;
    }

    init() {
        TemplateFileCache.clearCache()
    }

    /**
     * Render a template string.
     * @function
     * @abstract
     * @param {string} source - The template string to render.
     * @param {Object} data - The data object to use for rendering the template.
     * @param {Object} [options] - The options object to use when rendering the template.
     * @return {string} - The rendered string.
     * @throws {Error} - Method 'render' must be implemented.
     */
    render(source, data, options) {
        throw new Error('Method \'render\' must be implemented.');
    }

    /**
     * Compile a template string.
     * @function
     * @abstract
     * @param {string} source - The template string to compile.
     * @param {Object} [options] - The options object to use when compiling the template.
     * @return {Function} - The compiled template function.
     * @throws {Error} - Method 'compile' must be implemented.
     */
    compile(source, options) {
        throw new Error('Method \'compile\' must be implemented.');
    }

    /**
     * Render a template file.
     * @function
     * @abstract
     * @param {string} filename - The path to the template file to render.
     * @param {Object} data - The data object to use for rendering the template.
     * @throws {Error} - Method 'template' must be implemented.
     */
    renderFile(filename, data) {
        throw new Error('Method \'template\' must be implemented.');
    }

    /**
     * Get the template engine module itself, for calling other methods.
     * @function
     * @abstract
     * @throws {Error} - Method 'getOrigin' must be implemented.
     */
    getOrigin() {
        throw new Error('Method \'getOrigin\' must be implemented.');
    }

    /**
     * Get the directory where templates are stored.
     * If a relative path is given, it will be resolved relative to the current working directory.
     * @function
     * @return {string} - The absolute path to the template directory.
     */
    getTemplateDir() {
        return path.isAbsolute(this.templateDir) ?
            this.templateDir :
            path.resolve(process.cwd(), this.templateDir);
    }

    /**
     * Set the directory where templates are stored.
     * @function
     * @param {string} dir - The path to the template directory. If not specified, the default value is used.
     */
    setTemplateDir(dir) {
        this.templateDir = dir || this.templateDir;
    }

    /**
     * Get the file suffix used by this template engine.
     * @function
     * @return {string} - The file suffix.
     */
    getSuffix() {
        return this.suffix;
    }

    /**
     * Set the file suffix used by this template engine.
     * @function
     * @param {string} suffix - The file suffix. If not specified, the default value is used.
     */
    setSuffix(suffix) {
        this.suffix = suffix || this.suffix;
    }

    /**
     * Convert a template file path to a module path.
     * @function
     * @protected
     * @param {string} filepath - The template file path to convert.
     * @return {string} - The module path.
     */
    convertFilePath(filepath) {
        return path.join(this.getTemplateDir(), filepath.replace(/\./g, '/')) + this.getSuffix();
    }

    _shareData = {}

    /**
     * append share data to view engine
     * @param key
     * @param value
     */
    share(key, value) {
        this._shareData[key] = value;
    }

    /**
     * Renders a template file by using a cache to store compiled templates.
     * @param {string} url - The URL of the template.
     * @param {string} tplPath - The path to the template file.
     * @param {Object} data - The data object to be passed to the template.
     * @return {string|*} The rendered template.
     */
    renderFileByCache(url, tplPath, data) {
        if (this.enableFileCache) {
            return TemplateFileCache.getTemplate(url, () => {
                return this.renderFile(tplPath, data)
            })
        }
        return this.renderFile(tplPath, data)
    }

    /**
     * get share data
     * @return {{}}
     */
    getShare() {
        return this._shareData;
    }
}

// Export the TemplateEngine class.
module.exports = TemplateEngineAbstract;

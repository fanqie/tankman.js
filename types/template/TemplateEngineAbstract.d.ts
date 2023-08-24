export = TemplateEngineAbstract;
/**
 * TemplateEngineAbstract abstract class.
 * @class
 */
declare class TemplateEngineAbstract {
    /**
     * The file suffix used by this template engine.
     * @type {string}
     */
    suffix: string;
    /**
     * The directory where templates are stored.
     * @type {string}
     */
    templateDir: string;
    /**
     * @type {boolean}
     */
    enableFileCache: boolean;
    setEnableFileCache(enable?: boolean): void;
    setMaxLife(maxLife: any): void;
    disableFileCache(): void;
    templateFileCache: any;
    init(): void;
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
    render(source: string, data: any, options?: any): string;
    /**
     * Compile a template string.
     * @function
     * @abstract
     * @param {string} source - The template string to compile.
     * @param {Object} [options] - The options object to use when compiling the template.
     * @return {Function} - The compiled template function.
     * @throws {Error} - Method 'compile' must be implemented.
     */
    compile(source: string, options?: any): Function;
    /**
     * Render a template file.
     * @function
     * @abstract
     * @param {string} filename - The path to the template file to render.
     * @param {Object} data - The data object to use for rendering the template.
     * @throws {Error} - Method 'template' must be implemented.
     */
    renderFile(filename: string, data: any): void;
    /**
     * Get the template engine module itself, for calling other methods.
     * @function
     * @abstract
     * @throws {Error} - Method 'getOrigin' must be implemented.
     */
    getOrigin(): void;
    /**
     * Get the directory where templates are stored.
     * If a relative path is given, it will be resolved relative to the current working directory.
     * @function
     * @return {string} - The absolute path to the template directory.
     */
    getTemplateDir(): string;
    /**
     * Set the directory where templates are stored.
     * @function
     * @param {string} dir - The path to the template directory. If not specified, the default value is used.
     */
    setTemplateDir(dir: string): void;
    /**
     * Get the file suffix used by this template engine.
     * @function
     * @return {string} - The file suffix.
     */
    getSuffix(): string;
    /**
     * Set the file suffix used by this template engine.
     * @function
     * @param {string} suffix - The file suffix. If not specified, the default value is used.
     */
    setSuffix(suffix: string): void;
    /**
     * Convert a template file path to a module path.
     * @function
     * @protected
     * @param {string} filepath - The template file path to convert.
     * @return {string} - The module path.
     */
    protected convertFilePath(filepath: string): string;
    _shareData: {};
    /**
     * append share data to view engine
     * @param key
     * @param value
     */
    share(key: any, value: any): void;
    /**
     * Renders a template file by using a cache to store compiled templates.
     * @param {string} url - The URL of the template.
     * @param {string} tplPath - The path to the template file.
     * @param {Object} data - The data object to be passed to the template.
     * @return {string|*} The rendered template.
     */
    renderFileByCache(url: string, tplPath: string, data: any): string | any;
    /**
     * get share data
     * @return {{}}
     */
    getShare(): {};
}

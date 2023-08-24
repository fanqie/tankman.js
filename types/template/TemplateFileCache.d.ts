export = TemplateFileCache;
declare class TemplateFileCache {
    static setMaxLife(maxLife?: string): void;
    /**
     * Gets the compiled template for the specified URL, or generates and caches it if it does not exist.
     * @param {string} url - The URL of the template.
     * @param {Function} render - A function that generates the compiled template.
     * @return {string} The compiled template for the specified URL.
     */
    static getTemplate(url: string, render: Function): string;
    /**
     * Gets the cache name for the specified URL.
     * @param {string} url - The URL of the template.
     * @return {string} The cache name for the specified URL.
     * @private
     */
    private static _getCacheName;
    /**
     * Gets the cache file path for the specified URL.
     * @param {string} url - The URL of the template.
     * @return {string} The cache file path for the specified URL.
     * @private
     */
    private static _getCacheFilePath;
    static _dir: string;
    /**
     *
     */
    static clearCache(): void;
}

const fs = require('fs');
const ms = require('ms');
const path = require('path');
const crypto = require('crypto');

class TemplateFileCache {


    static setMaxLife(maxLife = '10s') {
        this.maxLife = ms(maxLife);
    }

    /**
     * Gets the compiled template for the specified URL, or generates and caches it if it does not exist.
     * @param {string} url - The URL of the template.
     * @param {Function} render - A function that generates the compiled template.
     * @return {string} The compiled template for the specified URL.
     */
    static getTemplate(url, render) {
        const filePath = this._getCacheFilePath(url)
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            if ((Date.now() - stats.birthtime.getTime()) < this.maxLife) {
                return fs.readFileSync(filePath, {encoding: "utf-8", flag: 'r'})
            }
            fs.unlinkSync(filePath)
        }

        const compiledTemplate = render();
        fs.writeFileSync(filePath, compiledTemplate);
        return compiledTemplate;
    }

    /**
     * Gets the cache name for the specified URL.
     * @param {string} url - The URL of the template.
     * @return {string} The cache name for the specified URL.
     * @private
     */
    static _getCacheName(url) {
        const hash = crypto.createHash('sha256');
        hash.update(encodeURIComponent(url));
        return hash.digest('hex');
    }

    /**
     * Gets the cache file path for the specified URL.
     * @param {string} url - The URL of the template.
     * @return {string} The cache file path for the specified URL.
     * @private
     */
    static _getCacheFilePath(url) {
        if (!fs.existsSync(this._dir)) {
            fs.mkdirSync(this._dir, {recursive: true})
        }
        return path.join(this._dir, `${this._getCacheName(url)}.cache`);
    }

    static _dir = path.join(process.cwd(),   ".runtime", "cache", "view")


    /**
     *
     */
    static clearCache() {
        if (fs.existsSync(this._dir)) {
            fs.rmdirSync(this._dir,{recursive:true});
        }
    }

}

module.exports = TemplateFileCache

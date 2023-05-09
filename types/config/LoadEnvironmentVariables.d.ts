export = LoadEnvironmentVariables;
/**
 *
 */
declare class LoadEnvironmentVariables {
    /**
     * @type {RegExp}
     */
    static varReg: RegExp;
    /**
     *
     * @param {string} filePath
     * @return {Object}
     * @public
     */
    public static load(filePath?: string): any;
    /**
     *
    * @param {string} filePath
     * @return {string}
     * @private
     */
    private static _getContent;
    static _saveContent(filePath: any, content: any): number;
    /**
     *
     * @param {string} name
     * @param {string} value
     * @param {string} filePath
     * @function
     */
    static appendToFile(name: string, value: string, filePath?: string): void;
}

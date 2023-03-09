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
     * @param filePath
     * @return {{}}
     * @public
     */
    public static Load(filePath?: string): {};
    /**
     *
     * @param filePath
     * @return string
     * @private
     */
    private static _GetContent;
    static _SaveContent(filePath: any, content: any): number;
    /**
     *
     * @param name
     * @param value
     * @param filePath
     * @return {*}
     * @function
     */
    static AppendToFile(name: any, value: any, filePath?: string): any;
}

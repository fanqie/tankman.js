export = LoadRouters;
declare class LoadRouters {
    /**
     * install project defined routers
     * @param {string} filePath
     * @static
     * @public
     */
    public static load(filePath: string): void;
    static scanAnnotate: () => void;
}

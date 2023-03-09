export = Env;
declare class Env {
    /**
     *
     * @type {{}}
     * @private
     */
    private _Envs;
    /**
     *
     * @return {{}}
     * @public
     */
    public All(): {};
    /**
     *
     * @param name
     * @param defaultVal
     * @return {*|null}
     * @public
     */
    public Get(name: any, defaultVal?: any): any | null;
    /**
     *
     * @param name
     * @param value
     * @private
     */
    private Set;
    /**
     * update or append a env filed
     * @param name
     * @param value
     * @function
     * @public
     */
    public SetAsFile(name: any, value: any): void;
    /**
     * @function
     * @public
     */
    public Load(): void;
    /**
     * check app run env is debugger mode
     * @returns {boolean}
     * @public
     */
    public IsDebugger(): boolean;
}

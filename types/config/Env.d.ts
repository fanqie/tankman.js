export = Env;
declare class Env {
    /**
     *
     * @type {{}}
     * @private
     */
    private _envs;
    /**
     *
     * @return {{}}
     * @public
     */
    public all(): {};
    /**
     *
     * @param {string} name
     * @param {*} [defaultVal=null]
     * @return {*|null}
     * @public
     */
    public get(name: string, defaultVal?: any): any | null;
    /**
     *
     * @param {string} name
     * @param {*} value
     * @private
     */
    private set;
    /**
     * update or append a env filed
     * @param {string} name
     * @param {*} value
     * @function
     * @public
     */
    public setAsFile(name: string, value: any): void;
    /**
     * @function
     * @public
     */
    public load(): void;
    /**
     * check app run env is debugger mode
     * @return {boolean}
     * @public
     */
    public isDebugger(): boolean;
}

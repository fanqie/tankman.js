export = Config;
/**
 * config class
 * @type {Config}
 */
declare class Config {
    _config: {};
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
     * @param {*} v
     * @public
     */
    public set(name: string, v: any): void;
    /**
     *
     * @public
     */
    public load(): void;
}

export = Config;
/**
 * config class
 * @type {Config}
 */
declare class Config {
    _Config: {};
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
     * @param v
     * @public
     */
    public Set(name: any, v: any): void;
    /**
     *
     * @public
     */
    public Load(): void;
}

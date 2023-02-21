export = Env;
/**
 *
 * @type {Env}
 */
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
     * @param v
     * @private
     */
    private Set;
    /**
     *
     * @public
     */
    public Load(): void;
}

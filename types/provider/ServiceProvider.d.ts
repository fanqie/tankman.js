export = ServiceProvider;
/**
 * @abstract
 */
declare class ServiceProvider {
    /**
     *
     * @param app
     * @abstract
     */
    constructor(app: any);
    app: any;
    /**
     * @abstract
     */
    register(): void;
    /**
     * @abstract
     */
    boot(): void;
}

export = ServiceProvider;
declare class ServiceProvider {
    static app: any;
    constructor(app: any);
    app: any;
    /**
     *
     */
    register(): void;
    /**
     *
     */
    boot(): void;
}

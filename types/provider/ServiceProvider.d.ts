export = ServiceProvider;
declare class ServiceProvider {
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

export = RouteAnnotate;
declare class RouteAnnotate {
    /**
     * Controller
     * @param routePrefix
     * @return {(function(*): void)|*}
     */
    static Controller(routePrefix: any): ((arg0: any) => void) | any;
    static Route(route: any, method: any, options?: {}): void;
    static getRoutes(controllerClasspath: any): {
        method: any;
        path: any;
        name: any;
        middlewares: any[];
        alias: any;
    }[];
}

export = RouteAnnotateParse;
declare class RouteAnnotateParse {
    static Controller(routePrefix: any): (target: any) => void;
    static Route(route: any, method: any): (target: any) => void;
    static getRoutes(controllerClasspath: any): any;
}

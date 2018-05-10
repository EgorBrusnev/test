import { routes } from "./Constants";


class Navigation {
    routes = routes;

    go(obj, route, replace = false) {
        if (replace == true) {
            obj.props.navigation.replace(route);
        }
        else {
            obj.props.navigation.navigate(route);
        }
    }
}


export default new Navigation();
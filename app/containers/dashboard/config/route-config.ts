/**
 * Route configuration for the dashboard glue container.
 */
class RouteConfig {
    /**
     * Sets up the routes.
     *
     * @param $stateProvider
     */
    constructor($stateProvider) {
        $stateProvider.state('top.repo.dashboard', {
            url: '/dashboard',
            sticky: true,
            deepStateRedirect: true,
            views: {
                'dashboard@top': {
                    template: require('./../tpl/dashboard.html'),
                    controller: require('./../controllers/dashboard-controller'),
                    controllerAs: 'dc'
                }
            }
        });
    }
}

export = RouteConfig;
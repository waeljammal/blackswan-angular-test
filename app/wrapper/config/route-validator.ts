import * as helper from 'common/services/helpers';

/**
 * Validates routes
 */
class RouteValidator {
    constructor($state: ng.ui.IState, $rootScope: op.IRootScope, NavManager: helper.NavManagerService) {
        $rootScope.$state = $state;

        // TODO Handle state change errors cleanly.
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            console.error(error);
        });

        // Validates routes and redirects to login when needed.
        $rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            NavManager.updateParams(fromState.name, fromParams);
            NavManager.updateParams(toState.name, toParams);
            NavManager.currentRoute = toState.name;

            // Uncomment to debug router
            // console.log('---------------------------------------------------');
            // console.log('Going from state: ' + fromState.name + ' to state: '  + toState.name);
            // console.log('From Params: ' + fromParams);
            // console.log('To Params: ' + toParams);
            // console.log('---------------------------------------------------');

            NavManager.captureDefaultParameters(toState, toParams);
        });
    }
}

export = RouteValidator;
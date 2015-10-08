import {IssuesService} from 'common/services/rest';
import * as helpers from 'common/services/helpers';

/**
 * Route configuration for the issues glue container.
 */
class RouteConfig {
    /**
     * Sets up the routes.
     *
     * @param $stateProvider
     */
    constructor($stateProvider: ng.ui.IStateProvider) {
        $stateProvider.state('top.repo.issues', {
            url: '/issues',
            sticky: true,
            deepStateRedirect: false,
            views: {
                'issues@top': {
                    template: require('./../tpl/issues.html'),
                    controller: require('./../controllers/issues-controller'),
                    controllerAs: 'ic'
                }
            },
            resolve: {
                setupIssues: function(resolveRepo, $state: ng.ui.IStateService, $timeout: ng.ITimeoutService,
                                      AppState: helpers.AppStateService, Issues: IssuesService,
                                      NavManager: helpers.NavManagerService)
                {
                    // We wont load issues or redirect if NavManager already contains params for issues.issue.
                    if (AppState.currentRepo && !NavManager.getParams('top.repo.issues.issue')) {
                        return Issues.loadAll().then((issues) => {
                            if (issues.length > 0) {
                                // Wait a frame, let the previous request complete first.
                                $timeout(() => {
                                    // Get the current params and replace the issue id
                                    let params = NavManager.getParams($state.current.name);
                                    params.issue = issues[0].id;

                                    $state.transitionTo(
                                        'top.repo.issues.issue',
                                        params,
                                        {reload: false, inherit: true, notify: true}
                                    );
                                });
                            }
                        });
                    }
                }
            }
        });

        $stateProvider.state('top.repo.issues.issue', {
            url: '/:issue',
            sticky: true,
            deepStateRedirect: false,
            resolve: {
                setupIssue: function($stateParams: any, preLoad: any,
                                     AppState: helpers.AppStateService,
                                     Issues: IssuesService, setupIssues: any) {
                    Issues.currentIssue = Issues.find($stateParams.issue);
                }
            }
        });
    }
}

export = RouteConfig;
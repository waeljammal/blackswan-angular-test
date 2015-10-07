import {inject, controller} from 'op/metadata';
import {IssuesService} from '../../../common/services/rest/rest';
import {Issue, Repository} from '../../../common/models/models';

import helpers = require('../../../common/services/helpers/helpers');

/**
 * Dashboard Controller glues all the different modules together.
 */
@controller()
class DashboardController {
    /**
     * Chart Labels
     */
    public labels: Array<string>;

    /**
     * Chart Data
     */
    public data: Array<number>;

    /**
     * Handles issue selection
     */
    public selectIssue: Function;

    @inject('AppState')
    private _appState: helpers.AppStateService;

    @inject('MsgBus')
    private _msgBus: helpers.MsgBus;

    @inject('Issues')
    private _issuesService: IssuesService;

    @inject('NavManager')
    private _nav: helpers.NavManagerService;

    @inject()
    private $state: ng.ui.IStateService;

    constructor($scope) {
        /**
         * Expose issue selection method and maintain current function scope.
         *
         * @param d {Object} Issue.
         */
        $scope.selectIssue = (d: Issue) => { this.doSelectIssue(d); };

        /**
         * Labels used for the charts.
         * @type {string[]}
         */
        $scope.labels = [];

        /**
         * Data used for the charts.
         * @type {number[]}
         */
        $scope.data = [];

        // Listen for repo changes
        this._msgBus.onMsg(this._appState.REPO_CHANGE_EVENT, (e, d) => { this.updateCharts(d); }, $scope);

        // Make sure charts are up to date on entry.
        // The data is already resolved by the router at this point.
        this.updateCharts(this._appState.currentRepo);

        // Register a public handler for issue selection.
        this.selectIssue = (issue) => { this.doSelectIssue(issue); };
    }

    /**
     * Returns the current repository.
     *
     * @returns {Repository}
     */
    get repo(): Repository {
        return this._appState.currentRepo;
    }

    /**
     * Sets the selected issue.
     *
     * @param issue Issue
     */
    set selectedIssue(issue: Issue) {
        this._issuesService.currentIssue = issue;
    }

    /**
     * Returns the selected issue.
     *
     * @returns Returns selected issue
     */
    get selectedIssue(): Issue {
        return this._issuesService.currentIssue;
    }

    /**
     * Returns all issues.
     *
     * @returns {Object[]} Array of issues.
     */
    get issues(): Array<Issue> {
        return this._issuesService.issueList;
    }

    /**
     * Handles issue selection.
     *
     * Redirects to the top.repo.issues.issue state.
     *
     * @param issue Selected Issue.
     */
    doSelectIssue (issue: Issue): void {
        let params = this._nav.getParams(this.$state.current.name);
        params.issue = issue.id.toString();

        this.$state.transitionTo(
            'top.repo.issues.issue',
            params,
            {reload: false, inherit: true, notify: true, location: 'replace'}
        );
    }

    /**
     * Updates the chart data.
     *
     * @param data {Object} Repository.
     */
    updateCharts(data: Repository): void {
        if (data === undefined) {
            return;
        }

        this.labels = ['Forks', 'Star Gazers', 'Watchers', 'Open Issues'];
        this.data =
            /*jshint camelcase: false */
            [data.forks, data.stargazers_count, data.watchers, data.open_issues];
            /*jshint camelcase: true */
    }

}

export = DashboardController;
import {log, inject, controller} from 'op/metadata'

/**
 * Dashboard Controller glues all the different modules together.
 */
@controller()
class DashboardController {
    /**
     * Chart Labels
     */
    public labels;

    /**
     * Chart Data
     */
    public data;

    /**
     * Handles issue selection
     */
    public selectIssue;

    @inject('AppState')
    private _appState;

    @inject('MsgBus')
    private _msgBus;

    @inject('Search')
    private _searchService;

    @inject('Issues')
    private _issuesService;

    @inject('NavManager')
    private _nav;

    @inject()
    private $state;

    constructor($scope) {
        /**
         * Expose issue selection method and maintain current function scope.
         *
         * @param d {Object} Issue.
         */
        $scope.selectIssue = (d) => {this.doSelectIssue(d);};

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
        this._msgBus.onMsg(this._appState.REPO_CHANGE_EVENT, (e, d) => {this.updateCharts(d);}, $scope);

        // Make sure charts are up to date on entry.
        // The data is already resolved by the router at this point.
        this.updateCharts(this._appState.currentRepo);

        // Register a public handler for issue selection.
        this.selectIssue = (issue) => {this.doSelectIssue(issue);};
    }

    /**
     * Returns the current repository.
     *
     * @returns {Object|undefined}
     */
    get repo() {
        return this._appState.currentRepo;
    }

    /**
     * Sets the selected issue.
     *
     * @param issue {Object|undefined}
     */
    set selectedIssue(issue) {
        this._issuesService.currentIssue = issue;
    }

    /**
     * Returns the selected issue.
     *
     * @returns {Object|undefined}
     */
    get selectedIssue() {
        return this._issuesService.currentIssue;
    }

    /**
     * Returns all issues.
     *
     * @returns {Object[]} Array of issues.
     */
    get issues() {
        return this._issuesService.issueList;
    }

    /**
     * Handles issue selection.
     *
     * Redirects to the top.repo.issues.issue state.
     *
     * @param issue {Object} Selected Issue.
     */
    doSelectIssue (issue) {
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
    updateCharts(data) {
        if(data === undefined) {
            return;
        }

        this.labels =['Forks', 'Star Gazers', 'Watchers', 'Open Issues'];
        this.data =
            /*jshint camelcase: false */
            [data.forks, data.stargazers_count, data.watchers, data.open_issues];
            /*jshint camelcase: true */
    }

}

export = DashboardController;
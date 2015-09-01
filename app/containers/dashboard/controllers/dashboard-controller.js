/**
 * Dashboard Controller glues all the different modules together.
 */
/* @ngInject */
export default class DashboardController {
    constructor($scope, $state, MsgBus, AppState, Search, Issues, NavManager) {
        /** @private **/
        this._appState = AppState;
        /** @private **/
        this._msgBus = MsgBus;
        /** @private **/
        this._service = Search;
        /** @private **/
        this._service = Issues;
        /** @private **/
        this._nav = NavManager;
        /** @private **/
        this.$state = $state;

        /**
         * Expose issue selection method and maintain current function scope.
         *
         * @param d {Object} Issue.
         */
        this.selectIssue = (d) => {this.doSelectIssue(d);};

        /**
         * Labels used for the charts.
         * @type {string[]}
         */
        this.labels = [];

        /**
         * Data used for the charts.
         * @type {number[]}
         */
        this.data = [];

        // Listen for repo changes
        this._msgBus.onMsg(AppState.REPO_CHANGE_EVENT, (e, d) => {this.updateCharts(d);}, $scope);

        // Make sure charts are up to date on entry.
        // The data is already resolved by the router at this point.
        this.updateCharts(AppState.currentRepo);
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
        this._service.currentIssue = issue;
    }

    /**
     * Returns the selected issue.
     *
     * @returns {Object|undefined}
     */
    get selectedIssue() {
        return this._service.currentIssue;
    }

    /**
     * Returns all issues.
     *
     * @returns {Object[]} Array of issues.
     */
    get issues() {
        return this._service.issueList;
    }

    /**
     * Handles issue selection, does not set any data. Instead
     * passes the new repo id in the URL letting the routing
     * resolver handle setting of the data.
     *
     * Redirects to the top.repo.issues.issue state.
     *
     * @param issue {Object} Selected Issue.
     */
    doSelectIssue(issue) {
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

module.exports = DashboardController;
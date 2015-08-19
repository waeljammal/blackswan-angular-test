/**
 * Dashboard Controller
 */
/* @ngInject */
export default class DashboardController {
    constructor($scope, MsgBus, AppState, Search) {
        this._appState = AppState;
        this._msgBus = MsgBus;
        this._service = Search;
        this.labels = [];
        this.data = [];

        // Listen for repo changes
        this._msgBus.onMsg(AppState.REPO_CHANGE_EVENT, (e, d) => {this.updateCharts(d);}, $scope);

        // Make sure charts are up to date on entry,
        // data is already resolved by the router.
        this.updateCharts(AppState.currentRepo);
    }

    /**
     * Returns the current repository.
     *
     * @returns {*}
     */
    get repo() {
        return this._appState.currentRepo;
    }

    /**
     * Updates the chart data.
     *
     * @param data
     */
    updateCharts(data) {
        if(data === undefined) {
            return;
        }

        this.labels =['Forks', 'Star Gazers', 'Watchers', 'Open Issues'];
        this.data = [
            /*jshint camelcase: false */
            [data.forks, data.stargazers_count, data.watchers, data.open_issues]
            /*jshint camelcase: true */
        ];
    }

}

module.exports = DashboardController;
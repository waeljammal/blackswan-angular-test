/**
 * Issues Controller
 */
/* @ngInject */
export default class IssuesController {
    constructor($state, Issues, NavManager) {
        this._service = Issues;
        this._nav = NavManager;
        this.labels = [];
        this.data = [];

        this.$state = $state;

        /**
         * Expose issue selection method and maintain current function scope.
         *
         * @param d
         */
        this.selectIssue = (d) => {this.doSelectIssue(d);};
    }

    /**
     * Sets the selected issue.
     *
     * @param issue
     */
    set selectedIssue(issue) {
        this._service.currentIssue = issue;
    }

    /**
     * Returns the selected issue.
     *
     * @returns {*}
     */
    get selectedIssue() {
        return this._service.currentIssue;
    }

    /**
     * Returns all issues.
     *
     * @returns {Array|*}
     */
    get issues() {
        return this._service.issueList;
    }

    /**
     * Handles issue selection.
     *
     * @param issue
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
     * Loads all issues.
     */
    update() {
        this._service.loadAll();
    }
}

module.exports = IssuesController;
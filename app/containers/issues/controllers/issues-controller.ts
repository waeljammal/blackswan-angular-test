import {inject, controller} from 'op/metadata';

/**
 * Issues Controller glues all the different modules together.
 */
@controller()
class IssuesController {
    /**
     * Expose issue selection method and maintain current function scope.
     *
     * @param d {Object} Issue.
     */
    public selectIssue: Function;

    /** @private **/
    @inject('Issues')
    private _service;

    /** @private **/
    @inject('NavManager')
    private _nav;

    /** @private **/
    @inject()
    private $state;

    constructor() {
        this.selectIssue = (d) => { this.doSelectIssue(d); };
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
     * Handles issue selection.
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
}

export = IssuesController;
import {inject, controller} from 'op/metadata';
import {IssuesService} from 'op/rest';
import {Issue} from 'op/model';
import {NavManagerService} from 'op/helpers';

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
    private _service: IssuesService;

    /** @private **/
    @inject('NavManager')
    private _nav: NavManagerService;

    /** @private **/
    @inject()
    private $state: ng.ui.IStateService;

    constructor() {
        this.selectIssue = (d: Issue) => { this.doSelectIssue(d); };
    }

    /**
     * Sets the selected issue.
     *
     * @param issue IIssue
     */
    set selectedIssue(issue: Issue) {
        this._service.currentIssue = issue;
    }

    /**
     * Returns the selected issue.
     *
     * @returns IIssue
     */
    get selectedIssue(): Issue {
        return this._service.currentIssue;
    }

    /**
     * Returns all issues.
     *
     * @returns Array of issues.
     */
    get issues(): Array<Issue> {
        return this._service.issueList;
    }

    /**
     * Handles issue selection.
     *
     * Redirects to the top.repo.issues.issue state.
     *
     * @param issue {Object} Selected Issue.
     */
    doSelectIssue(issue: Issue): void {
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
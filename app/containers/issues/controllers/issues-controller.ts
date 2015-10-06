import {inject, controller} from 'op/metadata';
import {IssuesService} from '../../../common/services/services';
import * as m from '../../../common/models/models';


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
    private _nav;

    /** @private **/
    @inject()
    private $state;

    constructor() {
        this.selectIssue = (d: m.Issue) => { this.doSelectIssue(d); };
    }

    /**
     * Sets the selected issue.
     *
     * @param issue IIssue
     */
    set selectedIssue(issue: m.Issue) {
        this._service.currentIssue = issue;
    }

    /**
     * Returns the selected issue.
     *
     * @returns IIssue
     */
    get selectedIssue(): m.Issue {
        return this._service.currentIssue;
    }

    /**
     * Returns all issues.
     *
     * @returns Array of issues.
     */
    get issues(): Array<m.Issue> {
        return this._service.issueList;
    }

    /**
     * Handles issue selection.
     *
     * Redirects to the top.repo.issues.issue state.
     *
     * @param issue {Object} Selected Issue.
     */
    doSelectIssue(issue: m.Issue): void {
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
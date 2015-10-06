/// <reference path='issues.d.ts' />
import {AppStateService} from '../services';
import * as m from '../../models/models';


/**
 * This services provides functions to load all issues for the active
 * repository or to find a single issue from an existing list.
 */

import {inject, service} from 'op/metadata';

@service()
export class IssuesService {
    /**
     * Current Issue
     */
    public currentIssue: m.Issue = null;

    /**
     * All Issues
     */
    public issueList: Array<m.Issue> = [];

    /** @private **/
    @inject()
    private $q: ng.IQService;

    /** @private **/
    @inject('AppState')
    private _state: AppStateService;

    @inject()
    private $resource: ng.resource.IResourceService;

    /**
     * What state to use for the issues.
     *
     * @type {string}
     */
    private issueListState: string = 'open';

    /**
     * Sorts by created date.
     *
     * @type {string}
     */
    private issueListSort: string = 'created';

    /**
     * Sorts in descending order.
     *
     * @type {string}
     */
    private issueListDirection: string = 'desc';

    /**
     * Returns a single issue or undefined if no issue was found.
     *
     * @param id {string} Id of the issue
     * @returns {Object}
     */
    find(id: string): m.Issue {
        for (let i = 0; i < this.issueList.length; i++) {
            if (this.issueList[i].id.toString() === id) {
                return this.issueList[i];
            }
        }

        return undefined;
    }

    /**
     * Loads all issues for the active repository.
     *
     * @returns {Object[]}
     */
    loadAll(): ng.IPromise<Array<m.Issue>> {
        let def = this.$q.defer();
        this.resource().query({
            state: this.issueListState,
            sort: this.issueListSort,
            direction: this.issueListDirection,
            /*jshint camelcase: false */
            name: this._state.currentRepo.name,
            /*jshint camelcase: true */
            login: this._state.currentRepo.owner.login
        }, (data) => {
            this.issueList = data;
            def.resolve(data);
        });

        return def.promise;
    }

    private resource(): IIssuesResource {
        let baseApi: string = 'https://api.github.com/repos/:login/:name/issues/:number';
        let params: any = { login: '@login', name: '@name', number: '@number' };

        let queryAction: ng.resource.IActionDescriptor = {
            method: 'GET',
            isArray: true
        };

        let getIssueAction: ng.resource.IActionDescriptor = {
            method: 'GET',
            isArray: true,
            params: {
                number: 0
            }
        };

        return <IIssuesResource> this.$resource(baseApi, params, {
            query: queryAction,
            getIssue: getIssueAction
        });
    }
}

module.exports = IssuesService;
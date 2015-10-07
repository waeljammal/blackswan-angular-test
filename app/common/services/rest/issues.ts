/// <reference path='issues.d.ts' />

import {Issue} from '../../models/models';
import {inject, service} from 'op/metadata';
import helpers = require('../helpers/helpers');

/**
 * This services provides functions to load all issues for the active
 * repository or to find a single issue from an existing list.
 */

@service()
export class IssuesService {
    /**
     * Current Issue
     */
    public currentIssue: Issue;

    /**
     * All Issues
     */
    public issueList: Array<Issue> = [];

    /** @private **/
    @inject()
    private $q: ng.IQService;

    /** @private **/
    @inject('AppState')
    private _state: helpers.AppStateService;

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
    find(id: string): Issue {
        for (let i = 0; i < this.issueList.length; i++) {
            if (this.issueList[i].id.toString() === id) {
                return new Issue(this.issueList[i]);
            }
        }

        return undefined;
    }

    /**
     * Loads all issues for the active repository.
     *
     * @returns {Object[]}
     */
    loadAll(): ng.IPromise<Array<Issue>> {
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
            this.issueList = Issue.parse1(data);
            def.resolve(this.issueList);
        });

        return def.promise;
    }

    private resource(): IIssuesResource {
        let baseApi: string = 'https://api.github.com/repos/:login/:name/issues/:number';
        let params: any = {login: '@login', name: '@name', number: '@number'};

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
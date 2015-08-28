/// <reference path="issues.d.ts" />

/**
 * This services provides functions to load all issues for the active
 * repository or to find a single issue from an existing list.
 */

import {log, inject, service} from '../globals/decorators/decorators'

@service()
class IssuesService implements IIssuesService {
    @inject()
    private $q:ng.IQService;

    @inject('AppState')
    private _state;

    @inject()
    private $resource:ng.resource.IResourceService;

    /**
     * Current Issue
     * @type {Object}
     */
    public currentIssue = null;

    /**
     * All Issues
     * @type {Object[]}
     */
    public issueList = [];

    /**
     * What state to use for the issues.
     *
     * @type {string}
     */
    private issueListState = 'open';

    /**
     * Sorts by created date.
     *
     * @type {string}
     */
    private issueListSort = 'created';

    /**
     * Sorts in descending order.
     *
     * @type {string}
     */
    private issueListDirection = 'desc';

    /**
     * The current page number.
     *
     * @type {number}
     */
    private issueListPage = 1;

    constructor() {

    }

    private resource():IIssuesResource {
        var baseApi:string = "https://api.github.com/repos/:login/:name/issues/:number";
        var params: any = {login: "@login", name: "@name", number:"@number"};

        var queryAction: ng.resource.IActionDescriptor = {
            method: "GET",
            isArray: true,
            transformResponse: (data: string) => {
                return angular.fromJson(data);
            }
        };

        var getIssueAction: ng.resource.IActionDescriptor = {
            method: "GET",
            isArray: true,
            params: {
                number: 0
            },
            transformResponse: (data: string) => {
                return angular.fromJson(data);
            }
        };

        return <IIssuesResource> this.$resource(baseApi, params, {
            query: queryAction,
            getIssue: getIssueAction
        });
    }

    /**
     * Returns a single issue or undefined if no issue was found.
     *
     * @param id {string} Id of the issue
     * @returns {Object}
     */
    find(id) {
        for(let i = 0; i < this.issueList.length; i++) {
            if(this.issueList[i].id.toString() === id) {
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
    loadAll() {
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
}

export = IssuesService;
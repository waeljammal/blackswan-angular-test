/**
 * This services provides functions to load all issues for the active
 * repository or to find a single issue from an existing list.
 */

/* @ngInject */
export default class IssuesService {
    constructor($resource, $q, AppState) {
        /**
         * @private
         */
        this.$q = $q;

        this._state = AppState;

        this._issuesResource = $resource('https://api.github.com/repos/:login/:name/issues/:number', {
            name: '@name',
            number: '@number',
            login: '@login'
        }, {
            getIssue: {
                method: 'GET',
                params: {
                    number: 0
                }
            }
        });

        /**
         * Current Issue
         * @type {Object}
         */
        this.currentIssue = null;

        /**
         * All Issues
         * @type {Object[]}
         */
        this.issueList = [];

        /**
         * What state to use for the issues.
         *
         * @type {string}
         */
        this.issueListState = 'open';

        /**
         * Sorts by created date.
         *
         * @type {string}
         */
        this.issueListSort = 'created';

        /**
         * Sorts in descending order.
         *
         * @type {string}
         */
        this.issueListDirection = 'desc';

        /**
         * The current page number.
         *
         * @type {number}
         */
        this.issueListPage = 1;
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

        this._issuesResource.query({
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

module.exports = IssuesService;
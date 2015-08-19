/**
 * Created by Wael on 17/08/15.
 */

/* @ngInject */
export default class IssuesService {
    constructor($resource, $q, AppState) {
        this._state = AppState;

        this.$q = $q;

        this.currentIssue = null;
        this.issueList = [];
        this.issueListState = 'open';
        this.issueListSort = 'created';
        this.issueListDirection = 'desc';
        this.issueListPage = 1;

        this.issuesResource = $resource('https://api.github.com/repos/:login/:name/issues/:number', {
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
    }

    find(id) {
        for(let i = 0; i < this.issueList.length; i++) {
            if(this.issueList[i].id.toString() === id) {
                return this.issueList[i];
            }
        }

        return undefined;
    }

    loadAll() {
        let def = this.$q.defer();

        this.issuesResource.query({
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
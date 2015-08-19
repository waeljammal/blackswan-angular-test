/**
 * Created by Wael on 17/08/15.
 */

/* @ngInject */
export default class RepositoryService {
    constructor($q, $resource) {
        this.$q = $q;

        this.repositories = [];

        this.resource = $resource('https://api.github.com/repos/:owner/:repo', {
            owner: '@owner',
            repo: '@repo'
        }, {
            query: { method: 'GET', isArray: false }
        });
    }

    load(owner, repo) {
        let def = this.$q.defer();

        this.resource.query({
            owner: owner,
            repo: repo
        }, (data) => {
            def.resolve(data);
        });

        return def.promise;
    }
}

module.exports = RepositoryService;
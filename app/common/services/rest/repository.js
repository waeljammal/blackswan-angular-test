/**
 * Used to load a single repository from the Google public API.
 */

/* @ngInject */
export default class RepositoryService {
    constructor($q, $resource) {
        /** @private **/
        this.$q = $q;

        this._resource = $resource('https://api.github.com/repos/:owner/:repo', {
            owner: '@owner',
            repo: '@repo'
        }, {
            query: { method: 'GET', isArray: false }
        });
    }

    /**
     * Loads a single repository.
     *
     * @param owner {string} Owner of the repository.
     * @param repo {string} Name of the repository.
     * @returns {Promise<Object, Error>} Containing repository information.
     */
    load(owner, repo) {
        let def = this.$q.defer();

        this._resource.query({
            owner: owner,
            repo: repo
        }, (data) => {
            def.resolve(data);
        });

        return def.promise;
    }
}

module.exports = RepositoryService;
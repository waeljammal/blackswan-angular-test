/**
 * This service exposes the github search API and lets you find a
 * repository by it's full name from the cached list.
 */

/* @ngInject */
export default class SearchService {
    constructor($q, $resource) {
        /** @private **/
        this.$q = $q;

        /**
         * List of all the repositories found using
         * the search(term) function.
         *
         * @type {Array} Array of repositories.
         */
        this.repositories = [];

        this._resource = $resource('https://api.github.com/search/repositories?q=:term', {
            term: '@term'
        }, {
            query: { method: 'GET', isArray: false }
        });
    }

    /**
     * Returns a single repository.
     *
     * @param fullName Eg. angular/angular.
     * @returns {Object|undefined} Repository or undefined.
     */
    find(fullName) {
        for(let i = 0; i < this.repositories.length; i++) {
            /*jshint camelcase: false */
            if(this.repositories[i].full_name === fullName) {
                return this.repositories[i];
            }
            /*jshint camelcase: true */
        }

        return undefined;
    }

    /**
     * Searches for a matching list of repositories using the term provided.
     *
     * @param term {string} Partial or full name of a repository.
     * @returns {Object[]} Array of repositories.
     */
    search(term) {
        let def = this.$q.defer();

        this._resource.query({
            term: term
        }, (data) => {
            this.repositories = data.items;
            def.resolve(data.items);
            console.log(data);
        });

        return def.promise;
    }
}

module.exports = SearchService;
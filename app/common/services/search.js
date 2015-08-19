/**
 * Created by Wael on 17/08/15.
 */

/* @ngInject */
export default class SearchService {
    constructor($q, $resource) {
        this.$q = $q;

        this.repositories = [];

        this.resource = $resource('https://api.github.com/search/repositories?q=:term', {
            term: '@term'
        }, {
            query: { method: 'GET', isArray: false }
        });
    }

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

    search(term) {
        let def = this.$q.defer();

        this.resource.query({
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
/**
 * This service exposes the github search API and lets you find a
 * repository by it's full name from the cached list.
 */

import {inject, service} from 'op/metadata';

@service()
class SearchService {
    /**
     * List of all the repositories found using
     * the search(term) function.
     *
     * @type {Array} Array of repositories.
     */
    public repositories: Array<any> = [];

    @inject()
    private $q: ng.IQService;

    @inject()
    private $resource: ng.resource.IResourceService;

    /**
     * Returns a single repository.
     *
     * @param fullName Eg. angular/angular.
     * @returns {Object|undefined} Repository or undefined.
     */
    find(fullName) {
        for (let i = 0; i < this.repositories.length; i++) {
            if (this.repositories[i].full_name === fullName) {
                return this.repositories[i];
            }
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

        this.resource().query({
            term: term
        }, (data) => {
            this.repositories = data.items;
            def.resolve(data.items);
            console.log(data);
        });

        return def.promise;
    }

    private resource(): ISearchResource {
        let baseApi: string = 'https://api.github.com/search/repositories?q=:term';
        let params: any = {term: '@term'};

        let queryAction: ng.resource.IActionDescriptor = {
            method: 'GET',
            isArray: false,
            transformResponse: (data: string) => {
                return angular.fromJson(data);
            }
        };

        let getIssueAction: ng.resource.IActionDescriptor = {
            method: 'GET',
            isArray: true,
            params: {
                number: 0
            },
            transformResponse: (data: string) => {
                return angular.fromJson(data);
            }
        };

        return <ISearchResource> this.$resource(baseApi, params, {
            query: queryAction,
            getIssue: getIssueAction
        });
    }
}

export = SearchService;
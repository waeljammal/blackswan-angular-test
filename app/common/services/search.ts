/**
 * This service exposes the github search API and lets you find a
 * repository by it's full name from the cached list.
 */

import {log, inject, service} from '../globals/decorators/decorators'

@service()
class SearchService {
    @inject()
    private $q:ng.IQService;

    @inject()
    private $resource:ng.resource.IResourceService;

    /**
     * List of all the repositories found using
     * the search(term) function.
     *
     * @type {Array} Array of repositories.
     */
    public repositories:Array<any> = [];

    private resource():IIssuesResource {
        var baseApi:string = "https://api.github.com/search/repositories?q=:term";
        var params: any = {term: '@term'};

        var queryAction: ng.resource.IActionDescriptor = {
            method: "GET",
            isArray: false,
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

        this.resource().query({
            term: term
        }, (data) => {
            this.repositories = data.items;
            def.resolve(data.items);
            console.log(data);
        });

        return def.promise;
    }
}

export = SearchService;
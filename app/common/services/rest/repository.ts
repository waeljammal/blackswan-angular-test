import {log, inject, service} from 'op/metadata'

/**
 * Used to load a single repository from the Google public API.
 */
@service()
class RepositoryService {

    @inject()
    private $q:ng.IQService;

    @inject()
    private $resource;

    constructor() {
    }

    private resource():ng.resource.IResourceClass<any> {
        var baseApi:string = "https://api.github.com/repos/:owner/:repo";
        var params: any = {owner: '@owner', repo: '@repo'};

        var queryAction: ng.resource.IActionDescriptor = {
            method: "GET",
            isArray: false,
            transformResponse: (data: string) => {
                return angular.fromJson(data);
            }
        };

        return <ng.resource.IResourceClass<any>> this.$resource(baseApi, params, {
            query: queryAction
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

        this.resource().query({
            owner: owner,
            repo: repo
        }, (data) => {
            def.resolve(data);
        });

        return def.promise;
    }
}

export = RepositoryService;
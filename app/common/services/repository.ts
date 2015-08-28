import {log, inject, service} from '../globals/decorators/decorators'

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

    private resource():IIssuesResource {
        var baseApi:string = "https://api.github.com/repos/:owner/:repo";
        var params: any = {owner: '@owner', repo: '@repo'};

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
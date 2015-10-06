import {inject, service} from 'op/metadata';

/**
 * Used to load a single repository from the Google public API.
 */
@service()
class RepositoryService implements IRepositoryService {
    /** @private **/
    @inject()
    private $q: ng.IQService;

    /** @private **/
    @inject()
    private $resource: ng.resource.IResourceService;

    /**
     * Loads a single repository.
     *
     * @param owner Owner of the repository.
     * @param repo Name of the repository.
     * @returns Repository information.
     */
    load(owner: string, repo: string): ng.IPromise<IRepository> {
        let def = this.$q.defer();

        this.resource().query({
            owner: owner,
            repo: repo
        }, (data) => {
            def.resolve(data);
        });

        return def.promise;
    }

    private resource(): ng.resource.IResourceClass<any> {
        let baseApi: string = 'https://api.github.com/repos/:owner/:repo';
        let params: any = {owner: '@owner', repo: '@repo'};

        let queryAction: ng.resource.IActionDescriptor = {
            method: 'GET',
            isArray: false
        };

        return <ng.resource.IResourceClass<any>> this.$resource(baseApi, params, {
            query: queryAction
        });
    }
}

export = RepositoryService;
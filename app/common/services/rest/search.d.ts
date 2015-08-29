interface ISearchResource extends ng.resource.IResourceClass<any> {
    /**
     * List of all the repositories found using
     * the search(term) function.
     */
    repositories: Array<IRepository>;

    getIssue(params: Object, success?: Function, error?: Function): ng.IPromise<Array<IRepository>>;
}

interface ISearchService {
    /**
     * Returns a single repository.
     *
     * @param fullName Eg. angular/angular.
     * @returns Repository or undefined.
     */
    find(fullName: string): IRepository;

    /**
     * Searches for a matching list of repositories using the term provided.
     *
     * @param term Partial or full name of a repository.
     * @returns Array of repositories.
     */
    search(term: string): ng.IPromise<Array<IRepository>>;
}
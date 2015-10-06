interface ISearchResource extends ng.resource.IResourceClass<any> {
    /**
     * List of all the repositories found using
     * the search(term) function.
     */
    repositories: Array<IRepository>;

    getIssue(params: Object, success?: Function, error?: Function): ng.IPromise<Array<IRepository>>;
}
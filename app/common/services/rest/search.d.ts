interface ISearchResource extends ng.resource.IResourceClass<any> {
    /**
     * List of all the repositories found using
     * the search(term) function.
     */
    repositories: Array<any>;

    getIssue(params: Object, success?: Function, error?: Function): ng.IPromise<Array<any>>;
}
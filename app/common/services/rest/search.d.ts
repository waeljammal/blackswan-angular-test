interface ISearchResource extends ng.resource.IResourceClass<any> {
    getIssue(params: Object, success?: Function, error?: Function);
}
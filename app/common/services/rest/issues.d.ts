// Issues resource definitions

interface IIssuesResource {
    query(params: Object, success?: Function, error?: Function);
}

interface IIssuesService {
    /**
     * Current Issue
     */
    currentIssue: IIssue;

    /**
     * All Issues
     */
    issueList: Array<IIssue>;

    /**
     * Returns a single issue or undefined if no issue was found.
     *
     * @param id Id of the issue
     * @returns Issue
     */
    find(id: string): IIssue;

    /**
     * Loads all issues for the active repository.
     *
     * @returns All Issues
     */
    loadAll(): ng.IPromise<Array<IIssue>>;
}

interface IIssue {
    id: string;
}

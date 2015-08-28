// Issues resource definitions

interface IIssuesResource {
    query(params: Object, success?: Function, error?: Function);
}

interface IIssuesService {

    /**
     * Current Issue
     * @type {Object}
     */
    currentIssue;

    /**
     * All Issues
     * @type {Object[]}
     */
    issueList;

    /**
     * Returns a single issue or undefined if no issue was found.
     *
     * @param id {string} Id of the issue
     * @returns {Object}
     */
    find(id);

    /**
     * Loads all issues for the active repository.
     *
     * @returns {Object[]}
     */
    loadAll();
}
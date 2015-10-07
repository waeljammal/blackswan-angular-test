/// <reference path="./issues.d.ts" />
/// <reference path="./search.d.ts" />
/// <reference path="./repository.d.ts" />

declare module 'op/rest' {
    import {SearchService as SearchService} from 'search';
    import {RepositoryService as RepositoryService} from 'repository';
    import {IssuesService as IssuesService} from 'issues';

    export {SearchService, RepositoryService, IssuesService}
}
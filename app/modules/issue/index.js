import IssueDirective from './directives/issue';

let moduleName = 'issueModule';

angular.module(moduleName, [

])

.directive('issue', () => {return new IssueDirective();});

module.exports = moduleName;
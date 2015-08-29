import IssueDirective from './directives/issue';

let moduleName = 'issueModule';

angular.module(moduleName, [

])

.directive('issue', IssueDirective);

module.exports = moduleName;
import IssuesDataListDirective from './directives/issues-data-list';

let moduleName = 'issuesDataListModule';

angular.module(moduleName, [

])

.directive('issuesDataList', IssuesDataListDirective);

module.exports = moduleName;
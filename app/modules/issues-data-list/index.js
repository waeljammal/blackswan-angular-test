import IssuesDataListDirective from './directives/issues-data-list';

let moduleName = 'issuesDataListModule';

angular.module(moduleName, [

])

.directive('issuesDataList', () => {return new IssuesDataListDirective();});

module.exports = moduleName;
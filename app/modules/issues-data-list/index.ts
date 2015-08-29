(() => {
    let moduleName = 'issuesDataListModule';

    angular.module(moduleName, [

    ])

        .directive('issuesDataList', [require('./directives/issues-data-list')]);

    module.exports = moduleName;
})();
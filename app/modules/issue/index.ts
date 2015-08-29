(() => {
    let moduleName = 'issueModule';

    angular.module(moduleName, [

    ])

        .directive('issue', [require('./directives/issue')]);

    module.exports = moduleName;
})();
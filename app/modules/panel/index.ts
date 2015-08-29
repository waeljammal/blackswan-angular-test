(() => {
    let moduleName = 'panelModule';

    angular.module(moduleName, [

    ])

    .directive('panel', [require('./directives/panel')]);

    module.exports = moduleName;
})();
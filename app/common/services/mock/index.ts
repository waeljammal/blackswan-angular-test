(() => {
    let moduleName = 'mocks';

    angular.module(moduleName, []);
    require('angular-mocks');

    let testsContext = require.context('.', true, /mock.ts$/);
    testsContext.keys().forEach(testsContext);

    module.exports = moduleName;
})();
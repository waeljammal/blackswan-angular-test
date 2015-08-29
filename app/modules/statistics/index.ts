(() => {
    let moduleName = 'statisticsModule';

    require('Chart.js/Chart');

    angular.module(moduleName, [
        'chart.js'
    ])

    .directive('statistics', [require('./directives/statistics')]);

    module.exports = moduleName;
})();
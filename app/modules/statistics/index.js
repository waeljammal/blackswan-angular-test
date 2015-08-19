import StatisticsDirective from './directives/statistics';

let moduleName = 'statisticsModule';

require('Chart.js/Chart');

angular.module(moduleName, [
    'chart.js'
])

.directive('statistics', () => {return new StatisticsDirective();});

module.exports = moduleName;
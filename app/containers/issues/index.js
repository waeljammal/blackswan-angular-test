import RouteConfig from './config/route-config';

let moduleName = 'issuesModule';

angular.module(moduleName, [
    require('issues-data-list'),
    require('issue'),
    'ngSanitize',
    'btford.markdown'
])

.config(RouteConfig);

module.exports = moduleName;
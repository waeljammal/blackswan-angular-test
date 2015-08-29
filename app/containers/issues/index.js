import RouteConfig from './config/route-config';

let moduleName = 'issuesModule';

angular.module(moduleName, [
    require('../../modules/issues-data-list'),
    require('../../modules/issue'),
    require('../../modules/panel'),
    'ngSanitize',
    'btford.markdown'
])

.config(RouteConfig);

module.exports = moduleName;
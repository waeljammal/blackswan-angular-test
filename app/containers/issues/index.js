let moduleName = 'issuesModule';

angular.module(moduleName, [
    require('issues-data-list'),
    require('issue'),
    require('panel'),
    'ngSanitize',
    'btford.markdown'
])

.config(require('./config/route-config'));

module.exports = moduleName;
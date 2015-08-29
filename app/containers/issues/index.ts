(() => {
    let moduleName = 'issuesModule';

    angular.module(moduleName, [
        require('../../modules/issues-data-list'),
        require('../../modules/issue'),
        require('../../modules/panel'),
        'ngSanitize',
        'btford.markdown'
    ])

    .config(require('./config/route-config'));

    module.exports = moduleName;
})();
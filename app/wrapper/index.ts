(() => {
    let moduleName = 'wrapperModule';

    // Load Module
    angular.module(moduleName, [
        // These are third party dependencies
        'ct.ui.router.extras',
        'ui.bootstrap',

        // These are the containers you want to enable
        require('../containers/dashboard'),
        require('../containers/issues')
    ])

    // Content view layout (header+body)
    .directive('appWrapper', require('./directives/app-wrapper'))
    // Header
    .directive('headerView', require('./directives/header'))

    // Run Phase
    .run(require('./config/route-validator'))

    // Config Phase
    .config(require('./config/route-config'));

    module.exports = moduleName;
})();
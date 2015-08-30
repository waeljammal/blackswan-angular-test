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

    // Site Header
    .directive('headerView', require('./directives/header'))
    // Content view layout
    .directive('appWrapper', require('./directives/app-wrapper'))

    // Run Phase
    .run(require('./config/plugin-run'))
    .run(require('./config/route-validator'))

    // Config Phase
    .config(require('./config/plugin-config'))
    .config(require('./config/route-config'));

    module.exports = moduleName;
})();
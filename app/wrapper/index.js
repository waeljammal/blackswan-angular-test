/**
 * @author Wael Jammal
 *
 * Bootstraps the application, brings in the glue containers that you
 * want to make available and requires global dependencies.
 *
 * Handles authentication as well.
 */

import RouteConfig from './config/route-config';
import PluginConfig from './config/plugin-config';
import PluginRun from './config/plugin-run';
import RouteValidator from './config/route-validator';
import HeaderDirective from './directives/header';
import FooterDirective from './directives/footer';
import ViewportDirective from './directives/app-wrapper';

let moduleName = 'wrapperModule';

angular.module(moduleName, [
    // These are third party dependencies
    'ct.ui.router.extras',
    'ui.bootstrap',

    // Wrapper Dependencies
    require('panel'),

    // These are the containers you want to enable
    require('../containers/dashboard'),
    require('../containers/issues')
])

// Site Header
.directive('headerView', () => { return new HeaderDirective(); })
// Site Footer
.directive('footerView', () => { return new FooterDirective(); })
// Content view layout
.directive('appWrapper', () => { return new ViewportDirective(); })

// Run Phase
.run(PluginRun)
.run(RouteValidator)

// Config Phase
.config(PluginConfig)
.config(RouteConfig);

module.exports = moduleName;
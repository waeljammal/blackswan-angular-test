/**
 * @author Wael Jammal
 *
 * Brings in the glue containers that you
 * want to make available and requires global dependencies.
 */

import RouteConfig from './config/route-config';
import PluginConfig from './config/plugin-config';
import RouteValidator from './config/route-validator';
import HeaderDirective from './directives/header';
import ViewportDirective from './directives/app-wrapper';

let moduleName = 'wrapperModule';

angular.module(moduleName, [
    // These are third party dependencies
    'ct.ui.router.extras',
    'ui.bootstrap',

    // These are the containers you want to enable
    require('../containers/dashboard'),
    require('../containers/issues')
])

// Site Header
.directive('headerView', () => { return new HeaderDirective(); })
// Content view layout
.directive('appWrapper', (AppState) => { return new ViewportDirective(AppState); })

// Run Phase
.run(RouteValidator)

// Config Phase
.config(PluginConfig)
.config(RouteConfig);

module.exports = moduleName;
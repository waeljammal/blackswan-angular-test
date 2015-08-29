import PanelDirective from './directives/panel';

let moduleName = 'panelModule';

angular.module(moduleName, [

])

.directive('panel', PanelDirective);

module.exports = moduleName;
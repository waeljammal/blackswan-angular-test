import PanelDirective from './directives/panel';

let moduleName = 'panelModule';

angular.module(moduleName, [

])

.directive('panel', ($compile) => {return new PanelDirective($compile);});

module.exports = moduleName;
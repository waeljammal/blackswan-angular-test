const moduleName = 'servicesModule';

angular.module(moduleName, [])

.service('AppState', require('./app-state'))
.service('NavManager', require('./nav-manager'))
.service('MsgBus', require('./msg-bus'))

.service('Search', require('./rest/search'))
.service('Issues', require('./rest/issues'))
.service('Repository', require('./rest/repository'));

export = moduleName;
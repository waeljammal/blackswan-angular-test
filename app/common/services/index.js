const moduleName = 'servicesModule';

angular.module(moduleName, [])

.service('Search', require('./rest/search'))
.service('Issues', require('./rest/issues'))
.service('Repository', require('./rest/repository'))
.service('AppState', require('./app-state'))
.service('NavManager', require('./nav-manager'))
.service('Storage', require('./util/storage'))
.service('MsgBus', require('./util/msg-bus'));

module.exports = moduleName;
const moduleName = 'servicesModule';

angular.module(moduleName, [])

.service('Search', require('./search'))
.service('Issues', require('./issues'))
.service('Repository', require('./repository'))
.service('AppState', require('./app-state'))
.service('NavManager', require('./nav-manager'))
.service('Storage', require('./storage'))
.service('MsgBus', require('./msg-bus'));

module.exports = moduleName;
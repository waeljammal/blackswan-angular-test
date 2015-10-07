/// <reference path="./helpers/helpers.ts" />
/// <reference path="./helpers/helpers.d.ts" />
/// <reference path="./rest/rest.ts" />
/// <reference path="./rest/rest.d.ts" />

const moduleName = 'servicesModule';

angular.module(moduleName, [])

.service('AppState', require('./helpers/app-state'))
.service('NavManager', require('./helpers/nav-manager'))
.service('MsgBus', require('./helpers/msg-bus'))

.service('Search', require('./rest/search'))
.service('Issues', require('./rest/issues'))
.service('Repository', require('./rest/repository'));

export = moduleName;
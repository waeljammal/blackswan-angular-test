///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angular-ui-router/angular-ui-router.d.ts"/>

import op = openPlatform;

// Support AMD require
declare module 'op' {
    export = op;
}

declare module openPlatform {
    /**
     * Defines this applications root scope.
     */
    export interface IRootScope extends angular.IRootScopeService {
        $state: angular.ui.IState;
    }
}
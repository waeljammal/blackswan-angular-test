// Support AMD require
declare module 'op/helpers' {
    import {MsgBus as MsgBus} from 'msg-bus';
    import {AppStateService as AppStateService} from 'app-state';
    import {NavManagerService as NavManagerService} from 'nav-manager';

    export {MsgBus, AppStateService, NavManagerService};
}
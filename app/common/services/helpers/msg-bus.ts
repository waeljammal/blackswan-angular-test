import {inject, service} from 'op/metadata';

/**
 * This bus allows you to register event listeners and emit
 * events from anywhere in your application.
 */
@service()
export class MsgBus {
    /**
     * @private
     */
    @inject()
    private $rootScope:any;

    /**
     * Emits a message on the $rootScope.
     *
     * @param msg {string} The event name.
     * @param data {*} The payload to send.
     */
    emitMsg(msg, data) {
        data = data || {};
        this.$rootScope.$emit(msg, data);
    }

    /**
     * Registers a message handler.
     *
     * @param msg {string} The event name.
     * @param func {Function} The callback function to invoke.
     * @param scope {$scope} Optional scope is used to unbind the listener on $destroy.
     */
    onMsg(msg:string, func:Function, scope?:ng.IScope) {
        let unbind = this.$rootScope.$on(msg, func);

        if (scope) {
            scope.$on('$destroy', unbind);
        }
    }
}

module.exports = MsgBus;

export default MsgBus;
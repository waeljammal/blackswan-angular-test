interface IMsgBus {
    emitMsg(msg:string, data:any);
    onMsg(msg:string, func:Function, scope?:ng.IScope);
}
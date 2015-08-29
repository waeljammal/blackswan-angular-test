interface IMsgBus {
    emitMsg(msg:string, data:any);
    onMsg(msg:string, listener: (event: ng.IAngularEvent, ...args: any[]) => any, scope?:ng.IScope);
}
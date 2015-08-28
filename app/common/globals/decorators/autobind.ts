export var autobind = function autobind(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    let fn = descriptor.value;

    if(typeof fn !== 'function')
        throw Error(`@autobind decorator can only be applied to methods not: ${typeof fn}`);
    return {
        configurable: true,
        get: function get() {
            var boundFn = fn.bind(this);
            Object.defineProperty(this, propertyKey, {
                value: boundFn,
                configurable: true,
                writable: true
            });
            return boundFn;
        }
    };
}
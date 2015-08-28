export var log = function log(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    var originalKey = propertyKey;
    var originalMethod = descriptor.value; // save a reference to the original method

    descriptor.value = function(...args: any[]) {
        console.log(this.constructor.name + ': [target]:' + originalKey + ' [args]: ' + JSON.stringify(args));
        var result = originalMethod.apply(this, args);
        console.log(this.constructor.name + ': [target]:' + originalKey + ' [return]: ' + result);
        return result;
    };

    return descriptor;
}
export module op.metadata {
    export function log(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        let originalKey = propertyKey;
        let originalMethod = descriptor.value; // save a reference to the original method

        descriptor.value = function (...args: any[]) {
            console.log(this.constructor.name + ': [target]:' + originalKey + ' [args]: ' + JSON.stringify(args));
            let result = originalMethod.apply(this, args);
            console.log(this.constructor.name + ': [target]:' + originalKey + ' [return]: ' + result);
            return result;
        };

        return descriptor;
    };
}

export var log = op.metadata.log;
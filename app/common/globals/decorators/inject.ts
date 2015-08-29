/// <reference path='../../../../typings/_custom.d.ts' />

let pending:Array<InjectionPoint> = [];

class InjectionPoint {
    private _target : any;
    private _propertyName : string;
    private _injectionKeys : Array<string>;
    private _keys = {};

    constructor(target:any, property:string, keys:Array<string>) {

        this._target = target;
        this._propertyName = property;
        this._injectionKeys = keys;

        var $inject = angular.injector();
        var result = $inject.annotate(this._target.constructor);

        for(let i = 0; i < keys.length; i++) {
            result.push(keys[i]);
            this._keys[keys[i]] = result.length-1;
        }

        this._target.constructor.$inject = result;

        if(!this._target['__inject__']) {
            this._target['__inject__'] = [];
        }

        this._target['__inject__'].push((instance, args) => {
            //console.log('Process Injection Point [Target]: ' +
            //    instance['__proto__'].constructor.name +
            //    ' [Property]: ' + this._propertyName );

            this.inject(args, instance);
        });
    }

    inject(values : Array<any>, target:any) : void {
        try {
            if (typeof target[this._propertyName] === 'function') {
                target[this._propertyName].apply(target, values);
            }
            else {
                target[this._propertyName] = values[this._keys[this._injectionKeys[0]]];
            }
        } catch(error) {
            console.error(error);
        }
    }
}

export var inject = function inject(...injectionKeys) {
    return function recordInjection(target : Object, decoratedPropertyName : string) : void {
        //console.log('Record Injection Point [Target]: ' +
        //    target.constructor['name'] +
        //    ' [Property]: ' + decoratedPropertyName );

        var keys = injectionKeys;

        if(keys.length == 0) {
            keys = new Array<string>();
            keys.push(decoratedPropertyName);
        }

        var point = new InjectionPoint(target, decoratedPropertyName, keys);

        pending.push(point);
    };
}
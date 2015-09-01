export module op.metadata {
    let pending: Array<InjectionPoint> = [];

    class InjectionPoint {
        private _target: any;
        private _propertyName: string;
        private _injectionKeys: Array<string>;
        private _keys = {};

        constructor(target: any, property: string, keys: Array<string>) {

            this._target = target;
            this._propertyName = property;
            this._injectionKeys = keys;

            // Annotate the constructor, this sets up $inject for us
            let $inject = angular.injector();
            let result = $inject.annotate(this._target.constructor);

            // Append our property injection to the constructor list, this is more efficient
            // just let angular take care of it for us.
            for (let i = 0; i < keys.length; i++) {
                result.push(keys[i]);
                this._keys[keys[i]] = result.length - 1;
            }

            // Replace the $inject for the constructor
            this._target.constructor.$inject = result;

            // Register our custom __inject__
            /* tslint:disable no-string-literal */
            if (!this._target['__inject__']) {
                this._target['__inject__'] = [];
            }

            // Push our inject handler into the list
            this._target['__inject__'].push((instance, args) => {
                // console.log('Process Injection Point [Target]: ' +
                //    instance['__proto__'].constructor.name +
                //    ' [Property]: ' + this._propertyName );

                this.inject(args, instance);
            });
            /* tslint:enable no-string-literal */
        }

        // Handles actual injection into a property of function
        // TODO: Test function, only property has been tested...
        inject(values: Array<any>, target: any): void {
            try {
                if (typeof target[this._propertyName] === 'function') {
                    target[this._propertyName].apply(target, values);
                } else {
                    target[this._propertyName] = values[this._keys[this._injectionKeys[0]]];
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    /**
     * Invoked when a property with this metadata is found.
     * @param injectionKeys Optional keys to use otherwise property name is used.
     * @returns {function(Object, string): void}
     */
    export function inject(...injectionKeys) {
        return function recordInjection(target: Object, decoratedPropertyName: string): void {
            // console.log('Record Injection Point [Target]: ' +
            //    target.constructor['name'] +
            //    ' [Property]: ' + decoratedPropertyName );

            let keys = injectionKeys;

            if (keys.length === 0) {
                keys = new Array<string>();
                keys.push(decoratedPropertyName);
            }

            // Create a new injection point, at the moment this is inefficient
            // TODO Use 1 injection point for a class instead of 1 per injection decorator
            let point = new InjectionPoint(target, decoratedPropertyName, keys);
            pending.push(point);
        };
    };
}

export var inject = op.metadata.inject;
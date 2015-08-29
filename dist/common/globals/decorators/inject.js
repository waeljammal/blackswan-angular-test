var op;
(function (op) {
    var metadata;
    (function (metadata) {
        var pending = [];
        var InjectionPoint = (function () {
            function InjectionPoint(target, property, keys) {
                var _this = this;
                this._keys = {};
                this._target = target;
                this._propertyName = property;
                this._injectionKeys = keys;
                var $inject = angular.injector();
                var result = $inject.annotate(this._target.constructor);
                for (var i = 0; i < keys.length; i++) {
                    result.push(keys[i]);
                    this._keys[keys[i]] = result.length - 1;
                }
                this._target.constructor.$inject = result;
                if (!this._target['__inject__']) {
                    this._target['__inject__'] = [];
                }
                this._target['__inject__'].push(function (instance, args) {
                    // console.log('Process Injection Point [Target]: ' +
                    //    instance['__proto__'].constructor.name +
                    //    ' [Property]: ' + this._propertyName );
                    _this.inject(args, instance);
                });
            }
            InjectionPoint.prototype.inject = function (values, target) {
                try {
                    if (typeof target[this._propertyName] === 'function') {
                        target[this._propertyName].apply(target, values);
                    }
                    else {
                        target[this._propertyName] = values[this._keys[this._injectionKeys[0]]];
                    }
                }
                catch (error) {
                    console.error(error);
                }
            };
            return InjectionPoint;
        })();
        function inject() {
            var injectionKeys = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                injectionKeys[_i - 0] = arguments[_i];
            }
            return function recordInjection(target, decoratedPropertyName) {
                // console.log('Record Injection Point [Target]: ' +
                //    target.constructor['name'] +
                //    ' [Property]: ' + decoratedPropertyName );
                var keys = injectionKeys;
                if (keys.length === 0) {
                    keys = new Array();
                    keys.push(decoratedPropertyName);
                }
                var point = new InjectionPoint(target, decoratedPropertyName, keys);
                pending.push(point);
            };
        }
        metadata.inject = inject;
        ;
    })(metadata = op.metadata || (op.metadata = {}));
})(op = exports.op || (exports.op = {}));
exports.inject = op.metadata.inject;
//# sourceMappingURL=inject.js.map
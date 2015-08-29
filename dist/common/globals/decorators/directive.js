var op;
(function (op) {
    var metadata;
    (function (metadata) {
        function directive() {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i - 0] = arguments[_i];
            }
            return function (target) {
                var factory = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    var newInstance = Object.create(target.prototype);
                    newInstance.constructor.apply(newInstance, args);
                    if (newInstance['__inject__']) {
                        for (var injectionPoint in newInstance['__inject__']) {
                            newInstance['__inject__'][injectionPoint](newInstance, args);
                        }
                    }
                    newInstance.link = angular.bind(newInstance, newInstance.link);
                    return newInstance;
                };
                factory.$inject = target.$inject;
                return factory;
            };
        }
        metadata.directive = directive;
        ;
    })(metadata = op.metadata || (op.metadata = {}));
})(op = exports.op || (exports.op = {}));
exports.directive = op.metadata.directive;
//# sourceMappingURL=directive.js.map
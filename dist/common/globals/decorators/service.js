var op;
(function (op) {
    var metadata;
    (function (metadata) {
        function service() {
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
                    if (newInstance['__inject__']) {
                        for (var injectionPoint in newInstance['__inject__']) {
                            if (injectionPoint) {
                                newInstance['__inject__'][injectionPoint](newInstance, args);
                            }
                        }
                    }
                    newInstance.constructor.apply(newInstance, args);
                    return newInstance;
                };
                factory.$inject = target.$inject;
                return factory;
            };
        }
        metadata.service = service;
        ;
    })(metadata = op.metadata || (op.metadata = {}));
})(op = exports.op || (exports.op = {}));
exports.service = op.metadata.service;
//# sourceMappingURL=service.js.map
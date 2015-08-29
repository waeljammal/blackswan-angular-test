var op;
(function (op) {
    var metadata;
    (function (metadata) {
        function log(target, propertyKey, descriptor) {
            var originalKey = propertyKey;
            var originalMethod = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                console.log(this.constructor.name + ': [target]:' + originalKey + ' [args]: ' + JSON.stringify(args));
                var result = originalMethod.apply(this, args);
                console.log(this.constructor.name + ': [target]:' + originalKey + ' [return]: ' + result);
                return result;
            };
            return descriptor;
        }
        metadata.log = log;
        ;
    })(metadata = op.metadata || (op.metadata = {}));
})(op = exports.op || (exports.op = {}));
exports.log = op.metadata.log;
//# sourceMappingURL=log.js.map
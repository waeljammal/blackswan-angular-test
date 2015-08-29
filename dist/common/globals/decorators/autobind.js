var op;
(function (op) {
    var metadata;
    (function (metadata) {
        function autobind(target, propertyKey, descriptor) {
            var fn = descriptor.value;
            if (typeof fn !== 'function') {
                throw Error('@autobind decorator can only be applied to methods not: ${typeof fn}');
            }
            ;
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
        metadata.autobind = autobind;
        ;
    })(metadata = op.metadata || (op.metadata = {}));
})(op = exports.op || (exports.op = {}));
exports.autobind = op.metadata.autobind;
//# sourceMappingURL=autobind.js.map
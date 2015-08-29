var op;
(function (op) {
    var metadata;
    (function (metadata) {
        var controllers = [];
        function controller() {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i - 0] = arguments[_i];
            }
            return function (target) {
                controllers.push(new ControllerInstance(target));
                return target;
            };
        }
        metadata.controller = controller;
        ;
        var ControllerInstance = (function () {
            function ControllerInstance(target) {
                var _this = this;
                this._apply = target.prototype.constructor.apply;
                target.prototype.constructor.apply = function (t, a) {
                    _this.doApply(t, a);
                };
            }
            ControllerInstance.prototype.doApply = function (target, args) {
                var _this = this;
                if (target['__inject__']) {
                    for (var injectionPoint in target['__inject__']) {
                        target['__inject__'][injectionPoint](target, args);
                    }
                }
                target.constructor.apply = this._apply;
                target.constructor.apply(target, args);
                target['__proto__'].constructor.apply = function (target, args) {
                    _this.doApply(target, args);
                };
            };
            return ControllerInstance;
        })();
    })(metadata = op.metadata || (op.metadata = {}));
})(op = exports.op || (exports.op = {}));
exports.controller = op.metadata.controller;
//# sourceMappingURL=controller.js.map
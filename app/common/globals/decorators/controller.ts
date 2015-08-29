let controllers = [];

/**
 * A decorator factory for use on classes that implement ng.IDecorator.
 *
 * This might not be the best way, but it was the most reliable I could get working in short time.
 *
 * @author Wael Jammal
 * @param values Optional Inj
 * @returns {function(Function): function(...[any]): ng.IDirective}
 */
export var controller = function controller(...values: string[]): any {
    return (target: Function) => {

        // I do this because i want angular to create the instance
        // as the controller initialization process is complex and
        // takes into account things like controllerAs, Directives,
        // Scope and much more. I just want to know when the constructor
        // gets called so I can do my thing.
        controllers.push(new ControllerInstance(target));

        return target;
    };
};

class ControllerInstance {
    private _apply;

    constructor(target: Function) {
        this._apply = target.prototype.constructor.apply;

        // Let angular call the constructor
        target.prototype.constructor.apply = (t, a) => {
            this.doApply(t, a);
        };
    }

    /* tslint:disable no-string-literal */
    doApply(target, args) {
        // Because property decorators are registered
        // as part of the proto creation and any
        // class instances are created we
        // will check if there is an injection point
        // for this new instance, if there is we invoke
        // it before calling the constructor so all
        // properties are injected in advance.
        // Todo: move to a util
        if(target['__inject__']) {
            for(let injectionPoint in target['__inject__']) {
                target['__inject__'][injectionPoint](target, args);
            }
        }

        // Restore the original constructor
        target.constructor.apply = this._apply;

        // Apply the original constructor
        target.constructor.apply (target, args);

        // Finally register our replacement apply function on the proto
        // so if the constructor gets called again we can handle it for
        // each new instance.
        target['__proto__'].constructor.apply = (target, args) => {
            this.doApply(target, args);
        };
    }
    /* tslint:enable no-string-literal */
}
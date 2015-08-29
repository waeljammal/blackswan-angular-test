/**
 * A decorator factory for use on classes that implement ng.IDecorator.
 *
 * @author Wael Jammal
 * @param values Optional Inj
 * @returns {function(Function): function(...[any]): ng.IDirective}
 */
export var service = function service(...values:string[]):any {
    return (target:Function) => {
        // Factory creates instance of directive once for
        // the life time of the app. I do not recommend
        // change this as it would be inefficient, link
        // is called per usage of the directive.
        var factory = (...args: any[]): ng.IDirective => {
            // Creates the instance
            var newInstance = Object.create(target.prototype);

            // Because property decorates are registered
            // before any class instances are created we
            // will check if there is an injection point
            // for this new instance, if there is we invoke
            // it before calling the constructor so all
            // properties are injected in advance.
            // Todo: move to a util
            if(newInstance['__inject__']) {
                for(let injectionPoint in newInstance['__inject__']) {
                    newInstance['__inject__'][injectionPoint](newInstance, args);
                }
            }

            // Invoke the constructor, includes dependencies for injection
            newInstance.constructor.apply(newInstance, args);

            return newInstance;
        };

        factory.$inject = target.$inject;

        return factory;
    };
};
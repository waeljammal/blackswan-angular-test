/**
 * A decorator factory for use on classes that implement ng.IDecorator.
 *
 * @author Wael Jammal
 * @param values Optional Inj
 * @returns {function(Function): function(...[any]): ng.IDirective}
 */
export var directive =   function directive(...values:string[]):any {
    return (target:Function) => {
        // Factory creates instance of directive once for
        // the life time of the app. I do not recommend
        // change this as it would be inefficient, link
        // is called per usage of the directive.
        var factory = (...args: any[]): ng.IDirective => {
            // Creates the instance
            var newInstance = Object.create(target.prototype);

            // Invoke the constructor, includes dependencies for injection
            newInstance.constructor.apply(newInstance, args);

            // Because property decorators are registered
            // as part of the proto creation and any
            // class instances are created we
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

            // Binds this in the link function to the instance we created
            // above, this lets you use the this.? accessor however this has
            // a downside, in that any state stored in a directive is global!!!
            newInstance.link = angular.bind(newInstance, newInstance.link);

            return newInstance;
        };

        factory.$inject = target.$inject;

        return factory;
    };
};
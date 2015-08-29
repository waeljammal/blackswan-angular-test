/**
 * Compiles the SCSS style sheets into the bundle.
 * This alias is defined in the webpack configuration.
 */
require('style');

/**
 * Helps with bootstrapping, it is currently used to bootstrap both the
 * main entry and the mock entry, you can use add to include extra
 * dependencies.
 *
 * @author Wael Jammal
 * @access public
 */
class Bootstrap implements IBootstrap {

    private dependencies: Array<string> = [];

    /**
     * Initializes the dependencies array
     */
    constructor() {
        this.add('ngResource');
        this.add('ui.router');
        this.add('ui.bootstrap');
        this.add(require('../services'));
        this.add(require('../../wrapper'));
    }

    /**
     * Add a dependency, you can use require() or just the module name such as ui.router.
     *
     * @param {Object} dependency
     * @returns {Bootstrap} Returns Self
     */
    add(dependency: any) {
        this.dependencies.push(dependency);
        return this;
    }

    /**
     * Starts the bootstrapping process.
     */
    start() {
        angular.element(document).ready(() => {
            angular.bootstrap(document.body, this.dependencies);
        });
    }
}

export = Bootstrap;
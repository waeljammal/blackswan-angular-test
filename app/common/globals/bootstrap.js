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
export default class Bootstrap {
    /**
     * Initializes the dependencies array
     */
    constructor() {
        this.dependencies = [
            'ngResource',
            'ui.router',
            'ui.bootstrap',
            require('../services'),
            require('../../wrapper')
        ];
    }

    /**
     * Add a dependency, you can use require() or just the module name such as ui.router.
     *
     * @param {Object} dependency
     * @returns {Bootstrap} Returns Self
     */
    add(dependency) {
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

module.exports = Bootstrap;
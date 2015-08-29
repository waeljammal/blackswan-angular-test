import {directive} from 'op/metadata';

/**
 * Header directive renders the global header.
 */
@directive()
class HeaderDirective implements ng.IDirective {
    public template = require('./../tpl/header.html');

    /**
     * Restricted to Attributes or Elements.
     *
     * @type {string}
     */
    public restrict: string = 'AE';

    /** @private **/
    public controller = require('../controller/header');

    /**
     * Controller Name
     *
     * @type {string} hc
     */
    public controllerAs: string = 'hc';
}

module.exports = HeaderDirective;
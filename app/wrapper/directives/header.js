import Directive from 'directive';

/**
 * Header directive renders the header.
 */
/* @ngInject */
export default class HeaderDirective extends Directive {
    constructor() {
        super();

        this.template = require('./../tpl/header.html');
        this.restrict = 'AE';
        this.transclude = false;
        this.replace = false;
        this.controller = require('../controller/header');
        this.controllerAs = 'hc';
    }

    link(scope, element, attrs, ctrl) {

    }
}

module.exports = HeaderDirective;
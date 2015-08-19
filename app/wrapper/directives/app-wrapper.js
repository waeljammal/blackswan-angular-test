import Directive from 'directive';

/**
 * Application wrapper directive, renders the main viewport.
 */
/* @ngInject */
export default class ViewportDirective extends Directive {
    constructor() {
        super();

        this.template = require('./../tpl/app-wrapper.html');
        this.restrict = 'AE';
        this.transclude = false;
        this.replace = false;
    }

    link(scope, element, attrs, ctrl) {

    }
}

module.exports = ViewportDirective;
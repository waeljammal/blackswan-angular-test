import Directive from 'directive';

/**
 * Application wrapper directive, renders the main viewport.
 */
/* @ngInject */
export default class ViewportDirective extends Directive {
    constructor(AppState) {
        super();

        this._appstate = AppState;

        this.template = require('./../tpl/app-wrapper.html');
        this.restrict = 'AE';
        this.transclude = false;
        this.replace = false;
    }

    link(scope, element, attrs, ctrl) {
        scope.state = this._appstate;
    }
}

module.exports = ViewportDirective;
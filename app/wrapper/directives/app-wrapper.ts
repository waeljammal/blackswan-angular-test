import {inject, directive} from 'op/metadata';

import helpers = require('../../common/services/helpers/helpers');

/**
 * Application wrapper directive, renders the main viewport.
 *
 * Note: using @directive creates only a single instance of this class!
 * so do not store state here, store it in your scope instead.
 */
@directive()
class ViewportDirective implements ng.IDirective {
    /** @private **/
    public template: string = require('./../tpl/app-wrapper.html');

    /**
     * Restricted to Attributes or Elements.
     *
     * @type {string}
     */
    public restrict: string = 'AE';

    /**
     * Application State Service
     * @private
     */
    @inject('AppState')
    private _appState: helpers.AppStateService;

    link(scope) {
        scope.state = this._appState;
    }
}

export = ViewportDirective;
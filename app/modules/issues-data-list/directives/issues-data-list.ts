///<reference path="../../../../typings/angularjs/angular.d.ts"/>
import {log, inject, directive} from '../../../common/globals/decorators/decorators'

/* @ngInject */
class PanelDataListDirective implements ng.IDirective {
    /** @private */
    public template:string = require('./../tpl/issues-data-list.html');

    /**
     * Restricted to Attributes or Elements.
     *
     * @type {string}
     */
    public restrict:string = 'AE';

    /**
     * data: Array of Issues. <br/>
     * selectedItem: Issue Object. <br/>
     * onSelect: Callback (Issue) => {} <br/>
     *
     * @type {{data: Object[], selectedItem: Object, onSelect: Function<Object>}}
     */
    public scope = {
        data: '=',
        selectedItem: '=',
        onSelect: '='
    };

    link(scope, element, attrs, ctrl, transclude) {

    }
}

export = PanelDataListDirective;
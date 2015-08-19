import Directive from 'directive';

/* @ngInject */
export default class PanelDataListDirective extends Directive {
    constructor() {
        super();

        /** @private */
        this.template = require('./../tpl/issues-data-list.html');

        /**
         * Restricted to Attributes or Elements.
         *
         * @type {string}
         */
        this.restrict = 'AE';

        /**
         * data: Array of Issues. <br/>
         * selectedItem: Issue Object. <br/>
         * onSelect: Callback (Issue) => {} <br/>
         *
         * @type {{data: Object[], selectedItem: Object, onSelect: Function<Object>}}
         */
        this.scope = {
            data: '=',
            selectedItem: '=',
            onSelect: '='
        };
    }

    link(scope, element, attrs) {

    }
}

module.exports = PanelDataListDirective;
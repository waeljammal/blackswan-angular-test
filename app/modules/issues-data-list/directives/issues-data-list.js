import Directive from 'directive';

/* @ngInject */
export default class PanelDataListDirective extends Directive {
    constructor() {
        super();

        this.template = require('./../tpl/issues-data-list.html');
        this.restrict = 'AE';
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
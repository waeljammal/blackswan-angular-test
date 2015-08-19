import Directive from 'directive';

/* @ngInject */
export default class IssueDirective extends Directive {
    constructor() {
        super();

        /** @private **/
        this.template = require('./../tpl/issue.html');

        /**
         * Restricted to Attributes or Elements.
         *
         * @type {string}
         */
        this.restrict = 'AE';

        /**
         * data: Issue Object.
         *
         * @type {{data: Object}}
         */
        this.scope = {
            data: '='
        };
    }

    /**
     * @private
     *
     * @param scope
     * @param element
     * @param attrs
     */
    link(scope, element, attrs) {

    }
}

module.exports = IssueDirective;
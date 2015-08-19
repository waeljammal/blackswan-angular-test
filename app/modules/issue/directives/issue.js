import Directive from 'directive';

/* @ngInject */
export default class IssueDirective extends Directive {
    constructor() {
        super();

        this.template = require('./../tpl/issue.html');
        this.restrict = 'AE';
        this.scope = {
            data: '='
        };
    }

    link(scope, element, attrs) {

    }
}

module.exports = IssueDirective;
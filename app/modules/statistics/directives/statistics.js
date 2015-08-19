import Directive from 'directive';

/* @ngInject */
export default class StatisticsDirective extends Directive {
    constructor() {
        super();

        this.template = require('./../tpl/statistics.html');
        this.restrict = 'AE';
        this.scope = {
            data: '=',
            labels: '=',
            repo: '='
        };
    }

    link(scope, element, attrs) {

    }
}

module.exports = StatisticsDirective;
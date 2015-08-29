import {directive} from 'op/metadata';

@directive()
class StatisticsDirective implements ng.IDirective {
    /** @private **/
    public template: string = require('./../tpl/statistics.html');

    /**
     * Restricted to Attributes or Elements.
     *
     * @type {string}
     */
    public restrict = 'AE';

    /**
     * @type {{data: string, labels: string, repo: string}}
     */
    public scope = {
        data: '=',
        labels: '=',
        repo: '='
    };
}

export = StatisticsDirective;
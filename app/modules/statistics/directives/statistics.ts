///<reference path="../../../../typings/angularjs/angular.d.ts"/>
import {directive, inject} from 'op/metadata';

@directive()
class StatisticsDirective implements ng.IDirective {
    /** @private **/
    public template:string = require('./../tpl/statistics.html');

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

    /**
     * @private
     */
    link(scope, element, attrs) {

    }
}

export = StatisticsDirective;
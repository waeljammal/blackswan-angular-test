///<reference path="../../../../typings/angularjs/angular.d.ts"/>
import {log, inject, directive} from '../../../common/globals/decorators/decorators'

/* @ngInject */
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
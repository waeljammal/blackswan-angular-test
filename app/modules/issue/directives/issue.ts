///<reference path="../../../../typings/angularjs/angular.d.ts"/>
import {log, inject, directive} from '../../../common/globals/decorators/decorators'

/* @ngInject */
export default class IssueDirective implements ng.IDirective {
    /** @private **/
    public template = require('./../tpl/issue.html');

    /**
     * Restricted to Attributes or Elements.
     *
     * @type {string}
     */
    public restrict = 'AE';

    /**
     * data: Issue Object.
     *
     * @type {{data: Object}}
     */
    public scope = {
        data: '='
    };

    /**
     * @private
     */
    link(scope, element, attrs) {

    }
}

module.exports = IssueDirective;
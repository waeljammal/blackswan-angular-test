import {directive} from 'common/globals/decorators';

@directive()
class IssueDirective implements ng.IDirective {
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
}

export = IssueDirective;
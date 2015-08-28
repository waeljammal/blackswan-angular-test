/// <reference path="../../../typings/_custom.d.ts" />

import {log, inject, directive} from '../../common/globals/decorators/decorators'

/**
 * Header directive renders the global header.
 */
class HeaderDirective implements ng.IDirective {
    public template = require('./../tpl/header.html');
    public restrict = 'AE';
    public controller = require('../controller/header');
    public controllerAs = 'hc';

    link(scope, element, attrs, ctrl, transclude) {

    }
}

export = HeaderDirective;
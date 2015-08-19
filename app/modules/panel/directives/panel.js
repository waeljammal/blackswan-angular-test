import Directive from 'directive';

/* @ngInject */
export default class PanelDirective extends Directive {
    constructor($compile) {
        super();

        this.$compile = $compile;
        this.template = require('./../tpl/panel.html');
        this.restrict = 'AE';
        this.transclude = true;
        this.scope = {
            titleLabel: '@',
            actions: '=',
            headerActions: '='
        };
    }

    link(scope, element, attrs, ctrl, transclude) {
        let actions = element.find('actions');

        if(actions.length > 0) {
            let children = actions[0].innerHTML;
            let footer = element.find('.panel-footer-btn-group');

            if (children) {
                actions.remove();
                scope.footerVisible = true;
                footer.html(this.$compile(children)(scope.$parent));
            }
        } else {
            angular.element(element).find('.panel-footer').remove();
        }
    }
}

module.exports = PanelDirective;
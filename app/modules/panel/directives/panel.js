import Directive from 'directive';

/* @ngInject */
export default class PanelDirective extends Directive {
    constructor($compile) {
        super();

        /** @private **/
        this.$compile = $compile;

        /** @private **/
        this.template = require('./../tpl/panel.html');

        /**
         * Restricted to Attributes or Elements.
         *
         * @type {string}
         */
        this.restrict = 'AE';

        /**
         * Transclusion occurs in the panel body.
         * @type {boolean}
         */
        this.transclude = true;

        /**
         * titleLabel: Title to appear in the header. </br>
         * actions: HTML element containing actions such as buttons. </br>
         *
         * @type {{titleLabel: string, actions: string}}
         */
        this.scope = {
            titleLabel: '@',
            actions: '='
        };
    }

    /**
     * @private
     *
     * @param scope
     * @param element
     * @param attrs
     * @param ctrl
     * @param transclude
     */
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
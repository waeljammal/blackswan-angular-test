import {directive, inject} from 'common/globals/decorators';

@directive()
class PanelDirective implements ng.IDirective {
    /** @private **/
    public template = require('./../tpl/panel.html');

    /**
     * Restricted to Attributes or Elements.
     *
     * @type {string}
     */
    public restrict: string = 'AE';

    /** @private **/
    public transclude: boolean = true;

    /**
     * titleLabel: Title to appear in the header. </br>
     * actions: HTML element containing actions such as buttons. </br>
     *
     * @type {{titleLabel: string, actions: string}}
     */
    public scope: any = {
        titleLabel: '@',
        actions: '='
    };

    /** @private **/
    @inject()
    private $compile: any;

    /**
     * @private
     */
    link(scope: any, element: ng.IRootElementService) {
        let actions = element.find('actions');

        if (actions.length > 0) {
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

export = PanelDirective;
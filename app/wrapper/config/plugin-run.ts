/**
 * Configures global plugins for this wrapper in the Run phase
 */
/* @ngInject */
export default class PluginRun {
    constructor() {
        /* tslint:disable no-string-literal */
        $(function() {
            return $('[data-toggle="tooltip"]')['tooltip']();
        });

        $(function() {
            return $('[data-toggle="popover"]')['popover']();
        });
        /* tslint:enable no-string-literal */
    }
}

module.exports = PluginRun;
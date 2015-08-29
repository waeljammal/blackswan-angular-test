/**
 * Configures global plugins for this wrapper in the Run phase
 */
/* @ngInject */
export default class PluginRun {
    constructor() {
        $(function() {
            return $('[data-toggle="tooltip"]')['tooltip']();
        });

        $(function() {
            return $('[data-toggle="popover"]')['popover']();
        });
    }
}

module.exports = PluginRun;
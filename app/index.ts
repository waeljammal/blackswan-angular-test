/// <reference path="./typings/custom.ts" />

(() => {
    /**
     * @author Wael Jammal
     *
     * The main entry point for the app.
     */
    let Bootstrap = require('./common/globals/bootstrap');

    // Global dependencies bootstrap
    let bootstrap: IBootstrap = new Bootstrap();
    bootstrap.start();
})();
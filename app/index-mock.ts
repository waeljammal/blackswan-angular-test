(() => {
    /**
     * @author Wael Jammal
     *
     * The main entry point for the mock app.
     */
    let Bootstrap = require('./common/globals/bootstrap');

    // Global dependencies bootstrap
    let bootstrap: IBootstrap = new Bootstrap();

    // It allow to load all the mock file
    bootstrap.add(require('./common/services/mock/index'));

    bootstrap.start();
})();
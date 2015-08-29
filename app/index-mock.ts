/**
 * @author Wael Jammal
 *
 * The main entry point for the mocked app.
 */
let Bootstrap = require('./common/globals/bootstrap');

// Global dependencies bootstrap
let bootstrap:IBootstrap = new Bootstrap();
bootstrap.add(require('./common/services/mock/index'))
bootstrap.start();
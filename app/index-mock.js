/**
 * @author Wael Jammal
 *
 * The main entry point for the app using mocks.
 */
import Bootstrap from './common/globals/bootstrap';

// Global dependencies bootstrap
let bootstrap = new Bootstrap();
bootstrap
    .add(require('./common/services/mock/index'))
    .start();
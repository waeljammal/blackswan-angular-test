// Load the module
require('../index');

(() => {
    let testsContext = require.context('.', true, /spec.ts$/);
    testsContext.keys().forEach(testsContext);
})();
/**
 * @author Wael Jammal
 *
 * This is the main entry point for a module,
 * you should declare your modules dependencies here
 * and register your main directive.
 *
 * Importing your dependencies is important and saves
 * time when unit testing, it also makes the module
 * fully independent and reusable.
 */
import SearchResultsDirective from './directives/search-results';

let moduleName = 'searchResultsModule';

// Remember to initialize dependencies per module as well
angular.module(moduleName, [])

// Declare the modules main directive
.directive('searchResults', () => { return new SearchResultsDirective(); });

module.exports = moduleName;
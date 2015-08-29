(() => {
    let moduleName = 'dashboardModule';

    angular.module(moduleName, [
        require('../../modules/statistics'),
        require('../../modules/panel')
    ])

    .filter('bytes', function() {
        return function(bytes, precision) {
            if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
                return '-';
            }

            if (typeof precision === 'undefined') {
                precision = 1;
            }

            let units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'],
                number = Math.floor(Math.log(bytes) / Math.log(1024));

            return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
        };
    })

    .config(require('./config/route-config'));

    module.exports = moduleName;
})();
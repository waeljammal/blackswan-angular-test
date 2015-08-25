var path = require('path');
var webpack = require('webpack');
var ComponentResolverPlugin = require('component-resolver-webpack');
var nodeModulesPath = path.join(__dirname, 'node_modules');
var bowerComponentsPath = path.join(__dirname, 'bower_components');
var vendorPath = path.join(__dirname, 'app/vendor');

module.exports = {
    resolveLoader: {
        root: nodeModulesPath
    },

    entry: {
        app: ['./index.js'],
        vendor: [
            'script!chart',
            'angular',
            'angular-sanitize',
            'angular-ui-router',
            'angular-aria',
            'angular-messages',
            'angular-chart',
            'angular-markdown',
            'ngResource',
            'ui-bootstrap-tpls',
            'jquery',
            'bootstrap',
            'jQueryUi',
            'angular-ui-router-extras',
            'script!showdown'
        ]
    },
    externals: {

    },
    devtool: 'source-map',
    context: __dirname + '/app',
    output: {
        filename: 'bundle.js',
        path: './target/js',
        publicPath: '/public/js/',
        library: 'PW',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {test: /jquery\.js$/, loader: 'expose?$' },
            {
                test: /\.js$/,
                exclude: /node_modules|bower_components|vendor/,
                loader: 'webpack-traceur?runtime=true&sourceMaps&experimental=true!jshint'
            },
            {test: /[\/\\]angular.min\.js$/, loader: "exports?angular"},
            {test: /\.png$/, loader: 'url?mimetype=image/png'},
            {test: /\.html$/, loader: 'raw', exclude: /node_modules|bower_components|vendor/},
            {test: /\.less$/, loader: "style!css!less"},
            {test: /\.css$/, loader: "style!css"},
            {test: /\.scss$/, loader: "style!css!sass"},
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=/res/[name].[ext]?[hash]'
            }
        ],
        noParse: [

        ],
        jshint: {
            // Display JSHint messages as webpack errors
            emitErrors: true,

            // fail the build on JSHInt errors
            failOnHint: false
        }
    },

    amd: { 'jQuery': true },

    resolve: {
        root: [
            nodeModulesPath,
            bowerComponentsPath,
            vendorPath,
            __dirname + "/public/ui-assets/style/",
            bowerComponentsPath + "/Chart.js"
        ],
        alias: {
            'style': __dirname + "/public/ui-assets/style/main.scss",
            'directive': __dirname + "/app/common/globals/directive.js",
            'jquery': 'jquery/dist/jquery.js',
            'jQueryUi': 'jquery-ui/jquery-ui.min.js',
            'angular': 'angular/angular.min.js',
            'angular-sanitize': 'angular-sanitize/angular-sanitize.min.js',
            'angular-aria': 'angular-aria/angular-aria.min.js',
            'angular-markdown': 'angular-markdown-directive/markdown.js',
            'angular-chart': __dirname + '/vendor/angular-chart.js/dist/angular-chart.js',
            'angular-ui-router': 'angular-ui-router/release/angular-ui-router.min.js',
            'angular-ui-router-extras': 'ui-router-extras/release/ct-ui-router-extras.min.js',
            'ngResource': 'angular-resource/angular-resource.min.js',
            'ui-bootstrap-tpls': 'angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bootstrap': 'bootstrap/dist/js/bootstrap.min.js',
            'lodash': 'underscore/underscore-min.js',
            'chart': 'Chart.js/Chart.min.js',
            'showdown': 'showdown/compressed/Showdown.js'
        },
        extensions: ['', '.js']
    },
    bail: false,
    plugins: [
        new ModuleReplacementPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ComponentResolverPlugin(
            ['js']
        ),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery",
            "Chart": "chart",
            "window.Chart": "chart"
        })
    ]
};

/**
 * Looks up all available modules and creates a mapping for each one.
 */
function ModuleReplacementPlugin () {
    this.resourceRegExp = [];

    var filesystem = require("fs");
    var modules = filesystem.readdirSync(__dirname + "/app/modules");

    for(var module in modules) {
        var name = modules[module];
        this.resourceRegExp.push(name);
        console.log(name)
    }
}

/**
 * <p>Allows custom path resolving.</p>
 *
 * eg.<br/>
 * myModule will resolve to the /app/modules folder
 */
ModuleReplacementPlugin.prototype.apply = function (compiler) {
    var resourceRegExp = this.resourceRegExp;
    compiler.plugin("normal-module-factory", function (nmf) {
        nmf.plugin("before-resolve", function (result, callback) {
            if (!result) {
                return callback();
            }

            var split = result.request.split(".");

            if(split.length > 0) {
                var name = split[0];

                if(resourceRegExp.indexOf(name) > -1 && name != 'bower' && name != 'containers' && name != 'service') {
                    result.request = __dirname + "/app/modules/" + split.join("/");
                } else if(name != 'bower' && name == 'containers') {
                    var map = split.slice(1);
                    result.request = __dirname + "/app/containers/" + map.join("/");
                } else if(name == 'bower') {
                    var map = split.slice(1);
                    result.request = bower_dir + "/" + map.join("/");
                }

                return callback(null, result);
            }

            return callback(result, result);
        });
    });
};
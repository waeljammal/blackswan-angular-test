var webpack = require('webpack');
var ComponentResolverPlugin = require('component-resolver-webpack');
var webpackConfig = require("./webpack.config.js");
var testArgs = require('yargs').argv;
var resolve = webpackConfig.resolve,
    loaders = webpackConfig.module.loaders,
    plugins = webpackConfig.plugins,
    getPostLoaders = function() {
        return [
            {
                test: /\.js$/,
                exclude: /(test|node_modules|bower_components)\//,
                include: './app',
                loader: 'istanbul-instrumenter'
            },
            {
                test: /\.ts$/,
                loader: 'istanbul-instrumenter',
                include: './app',
                exclude: /(test|node_modules|bower_components)\//,
            }
        ];
    };

module.exports = {
    module: {
        loaders: loaders,
        noParse: webpackConfig.module.noParse,
        postLoaders: getPostLoaders()
    },
    resolve: resolve,
    progress: true,
    color: true,
    plugins: [
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ComponentResolverPlugin(
            ['js', 'ts']
        ),
        new webpack.ProvidePlugin({
            ace: "ace",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.$": "jquery"
        })
    ],
    context: webpackConfig.context,
    devtool: 'inline-source-map',
    amd: { jQuery: true }
};
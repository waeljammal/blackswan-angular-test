var CompressionPlugin = require("compression-webpack-plugin");

module.exports = function(grunt) {

    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

    var path = require('path');
    var webpack = require("webpack");
    var webpackConfig = require("./webpack.config.js");
    var karma = require('karma');
    var esdoc = require('esdoc');

    grunt.initConfig({
        webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.AggressiveMergingPlugin(),
                    new CompressionPlugin({
                        asset: "{file}.gz",
                        algorithm: "gzip",
                        regExp: /\.js$|\.html$/,
                        threshold: 10240,
                        minRatio: 0.8
                    })
                )
            },
            "build-dev": {
                devtool: "source-map",
                debug: true
            }
        },

        "webpack-dev-server": {
            options: {
                webpack: webpackConfig,
                port: 7358,
                progress: true,
                color: true,
                publicPath: '/public/js/'
            },
            start: {
                keepAlive: true,
                webpack: {
                    devtool: "source-map",
                    debug: true
                }
            },
            mock: {
                keepAlive: true,
                port: 7358,
                webpack: {
                    devtool: "source-map",
                    debug: true,
                    entry: {
                        app: './index-mock.js',
                        vendor: webpackConfig.entry.vendor
                    }
                }
            }
        },

        watch: {
            app: {
                files: ["app/**/*", "public/**/*"],
                tasks: ["webpack:build-dev"],
                options: {
                    spawn: false
                }
            }
        },

        uglify: {
            options: {
                mangle: false,
                sourceMap: true,
                sourceMapIn: 'target/js/bundle.js.map',
                compress: true,
                preserveComments: false,
                drop_console: true
            },
            my_target: {
                files: {
                    'target/js/bundle.js': ['target/js/bundle.js']
                }
            }
        },

        copy: {
            target: {
                files: [
                    // Skeleton uses require for HTML so no need to copy them, however uncomment this if you want to
                    //{cwd: 'app/modules', expand: true, src: '**/*.html', dest: 'target/modules/'},
                    {cwd: 'bower_components/font-awesome/fonts', expand: true, src: '**/*', dest: 'target/ui-assets/fonts'},
                    {cwd: 'bower_components/font-awesome/fonts', expand: true, src: '**/*', dest: 'target/fonts'},
                    {cwd: 'bower_components/bootstrap/fonts', expand: true, src: '**/*', dest: 'target/ui-assets/fonts'},
                    {cwd: 'public/ui-assets/img', expand: true, src: '**/*', dest: 'target/ui-assets/img'},
                    {cwd: 'public', expand: true, src: '**/*.html', dest: 'target/'},
                    {cwd: 'public/scripts', expand: true, src: '**/*.js', dest: 'target/scripts'}
                ]
            },
            docs: {
                files: [
                    {cwd: 'bower_components/font-awesome/fonts', expand: true, src: '**/*', dest: 'target/docs/user/fonts'}
                ]
            }
        },

        cssmin: {
            build: {
                options: {
                    keepSpecialComments:0,
                    processImport: true,
                    roundingPrecision: -1,
                    shorthandCompacting: false,
                    aggressiveMerging: false,
                    advanced: false,
                    cleancss: true
                },
                files: {
                    'target/ui-assets/style/main.css': [ 'public/ui-assets/style/main.css' ]
                }
            }
        },

        clean: {
            build: {
                src: [ 'target' ]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: false,
                browsers: ['PhantomJS2'],
                logLevel: 'INFO'
            },
            build: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS2'],
                logLevel: 'INFO'
            }
        },

        parallel: {
            dev: {
                options: {
                    stream: true,
                    grunt: true
                },
                tasks: ["webpack-dev-server:start", "karma:unit"]
            },
            mock: {
                options: {
                    stream: true,
                    grunt: true
                },
                tasks: ["webpack-dev-server:mock", "karma:unit"]
            }
        },

        exec: {
            docs: {
                cmd: 'esdoc -c esdoc.json',
                stderr: false
            }
        }
    });

    // Development runs live + untit tests
    grunt.registerTask("default", ["parallel:dev"]);

    // Development runs mocks + untit tests
    grunt.registerTask("mock", ["parallel:mock"]);

    // Docs
    grunt.registerTask("docs", ["exec:docs", "copy:docs"]);

    // Production build
    grunt.registerTask("build", ["clean", "karma:build", "webpack:build", "copy", "docs", "cssmin", "uglify"]);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-parallel');
};
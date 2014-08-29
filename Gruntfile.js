'use strict';
var ext = require('./.gruntExt');
var iwc = require('./.gruntIwc').load(ext);
module.exports = function (grunt) {

    // Common
    ext.configure({
        path: {
            src: 'src/webc',
            tmp: 'dist/webc',
            dist: 'dist/webc.js'
        },
        clean: {
            src: ['dist/webc/*', 'dist/webc.js']
        }
    });

    // Library
    ext.configure({
        ts: {
            lib: {
                src: ['<%= path.src %>/**/*.ts'],
                outDir: '<%= path.tmp %>',
                options: {
                    module: 'commonjs',
                    target: 'es3',
                    sourceMaps: true,
                    declaration: true,
                    removeComments: false
                }
            }
        },
        nodeunit: {
            lib: '<%= path.tmp %>/**/*_tests.js'
        },
        copy: {
            '<%= path.tmp %>/platform.js': 'bower_components/platform/build/platform.concat.js'
        },
        browserify: {
            lib: {
                files: {
                    '<%= path.dist %>': ['<%= path.tmp %>/**/*.js']
                }
            }
        },
        uglify: {
            lib: {
                files: {
                    'dist/webc.min.js': 'dist/webc.js'
                }
            }
        }
    });
    ext.registerTask('_lib', ['ts:lib', 'nodeunit:lib', 'copy', 'browserify:lib', 'uglify:lib']);

    // Dev
    ext.configure({
        connect: {
            lib: {
                options: {
                    port: 3007,
                    base: '.'
                }
            }
        },
        watch: {
            lib: {
                files: ['src/webc/**/*.ts'],
                tasks: ['_lib'],
                options: {
                    spawn: true
                }
            }
        }
    });
    ext.registerTask('_dev', ['components', 'connect', 'watch']);

    // Dev components
    iwc.components('demo/components');

    // Tasks
    ext.initConfig(grunt);
    grunt.registerTask('default', ['clean', '_lib']);
    grunt.registerTask('dev', ['default', '_dev']);
}

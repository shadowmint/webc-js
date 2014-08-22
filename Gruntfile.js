'use strict';
var ext = require('./.gruntExt');
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
        shell: {
            bower: {
                command: 'bower install',
                options: {
                    stderr: true,
                    stdout: true,
                }
            },
            npm: {
                command: 'npm install',
                options: {
                    stderr: true,
                    stdout: true,
                    execOptions: {
                        cwd: 'bower_components/platform'
                    }
                }
            },
            platform: {
                command: 'grunt --force',
                options: {
                    stderr: true,
                    stdout: true,
                    execOptions: {
                        cwd: 'bower_components/platform'
                    }
                }
            }
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
    ext.registerTask('_platform', ['shell:bower', 'shell:npm', 'shell:platform']);
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
    ext.registerTask('_dev', ['connect', 'watch']);

    // Tasks
    ext.initConfig(grunt);
    grunt.registerTask('default', ['clean', '_lib']);
    grunt.registerTask('setup', ['_platform']);
    grunt.registerTask('dev', ['default', '_dev']);
}

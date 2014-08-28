'use strict';

var fs = require('fs');
var ext = null;
var components = [];

/** Load this submodule */
function load(_ext) {
    ext = _ext;
    return api;
}

/** Register a component */
function component(name, src, dest) {

    // Setup paths
    var tmp = dest + '/' + name + '/build';
    var task = '_' + name.replace(/-/g, '_');

    // Build task for this component
    var config = {
        sass: {
            compile: {
                files: [
                    {
                        expand: true,
                        cwd: src,
                        src: ['*.scss'],
                        dest: tmp,
                        ext: '.css'
                    }
                ]
            }
        },
        jade: {
            compile: {
                files: [
                    {
                        expand: true,
                        cwd: src,
                        src: ['*.jade'],
                        dest: tmp,
                        ext: '.html'
                    }
                ]
            }
        },
        typescript: {
            compile: {
                src: [src + '/*.ts'],
                dest: tmp,
                options: {
                    module: 'amd',
                    target: 'es3',
                    sourceMap: true,
                    declaration: true
                }
            }
        },
        iwc: {
            component: {
                src: tmp,
                dest: dest,
                options: {
                    script: src + '/script.js',
                    output: name
                }
            }
        },
        watch: {
            sass: {
                files: [src + '/*.scss'],
                tasks: ['sass:compile'],
                options: {
                    spawn: true
                }
            },
            jade: {
                files: [src + '/*.jade'],
                tasks: ['jade:compile'],
                options: {
                    spawn: true
                }
            },
            typescript: {
                files: [src + '/*.ts'],
                tasks: ['typescript:compile'],
                options: {
                    spawn: true
                }
            },
            iwc: {
                files: [tmp + '/**/*'],
                tasks: ['iwc:component'],
                options: {
                    spawn: true
                }
            }
        }
    };

    // Generate a custom watch and build for this component
    var builds = [];
    for (var key in config) {
        for (var sub in config[key]) {
            if (key == 'watch') {
                for (var watch_target in config[key][sub]['tasks']) {
                    var output = config[key][sub]['tasks'][watch_target] + task;
                    config[key][sub]['tasks'][watch_target] = output;
                }
            }
            else {
                builds.push(key + ':' + sub + task);
            }
            config[key][sub + task] = config[key][sub];
            delete config[key][sub];
        }
    }

    // Tasks
    ext.configure(config);
    ext.registerTask(task, builds)
    components.push(task);
}

/** Register all the components */
function register_components(path) {
  if (path) {
    var sources = fs.readdirSync(path);
    for (var i = 0; i < sources.length; ++i) {
      var p = path + '/' + sources[i];
      if (fs.lstatSync(p).isDirectory()) {
        component(sources[i], p, path);
      }
    }
  }
  ext.registerTask('components', components);
}

// API
var api = {
    load: load,
    component: component,
    components: register_components
};
module.exports = api;

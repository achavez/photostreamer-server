module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Copy FontAwesome files to the fonts/ directory
    copy: {
      fonts: {
        src: [
          'bower_components/bootstrap/fonts/**'
        ],
        dest: 'static/fonts/',
        flatten: true,
        expand: true
      }
    },

    // Delete files before running a build
    clean: {
      css: ['static/fonts', 'static/client.css'],
      js: ['static/*.js*', 'build/*.js']
    },

    // Compile LESS
    less: {
      client: {
        options: {
          cleancss: true
        },
        files: {
          "static/client.css": "client/less/client.less"
        }
      }
    },

    // Compile Handlebars templates
    handlebars: {
      client: {
        options: {
          amd: ['handlebars', '../templates/helpers'],
          processName: function(filePath) {
            var pieces = filePath.split("/");
            var filename = pieces[pieces.length - 1];
            var base = filename.split('.');
            return base[0];
          }
        },
        files: {
          "build/templates.js": "client/templates/**/*.hbs"
        }
      }
    },

    // Lint JavaScript
    jshint: {
      client: ['client/**/*.js'],
      server: ['*.js']
    },

    // Build client bundle with r.js optimizer
    requirejs: {
      client: {
        options: {
          baseUrl: 'client/js',
          mainConfigFile: 'client/js/config.js',
          out: 'static/client.js',
          optimize: 'uglify2',
          include: [
            'app'
          ],
          name: '../../bower_components/almond/almond',
          generateSourceMaps: true,
          preserveLicenseComments: false
        }
      }
    },

    // Use Node Inspector, available at http://127.0.0.1:8080/debug?port=5858
    'node-inspector': {
      dev: {}
    },

    // Start the node server app and restart when app code changes
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          env: grunt.file.readJSON('.env'),
          nodeArgs: ['--debug'],
          stdout: false,
          watch: ['app.js', 'models.js', 'views/**/*.hbs', '.env'],
          callback: function (nodemon) {
            // Don't log to the console
            nodemon.on('log', function() {});

            // Trigger a refresh on restart
            nodemon.on('restart', function () {
              setTimeout(function() {
                require('fs').writeFileSync('.rebooted', 'rebooted');
              }, 1000);
            });
          }
        }
      }
    },

    // Watch client-side code for changes and re-build as needed
    watch: {
      js: {
        files: ['client/**/*.js', 'client/templates'],
        tasks: ['build:js']
      },
      less: {
        files: ['client/**/*.less'],
        tasks: ['build:css']
      },
      // Only livereload when restart/build is complete
      livereload: {
        files: ['.rebooted', 'static/*.css', 'static/*.js'],
        options: {
          livereload: true
        }
      }
    },

    // Run server, client dev tasks concurrently
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: ['watch', 'nodemon', 'node-inspector']
    }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-node-inspector');

  // Tasks
  grunt.registerTask('build:js', ['jshint:client', 'clean:js', 'handlebars', 'requirejs']);
  grunt.registerTask('build:css', ['clean:css', 'copy', 'less']);
  grunt.registerTask('build', ['build:js', 'build:css']);

  grunt.registerTask('default', ['build', 'concurrent']);

};

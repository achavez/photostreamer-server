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

    // Compile LESS
    less: {
      compileAppStyles: {
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
      compile: {
        options: {
          amd: '../templates/helpers',
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

    // Concatenate .js
    concat: {
      options: {
        separator: ';\n',
      },
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/underscore/underscore.js',
          'bower_components/backbone/backbone.js'
        ],
        dest: 'static/backbone-bundle.js',
      },
    },

    // Build client bundle with r.js optimizer
    requirejs: {
      compile: {
        options: {
          baseUrl: 'client/js',
          mainConfigFile: 'client/js/config.js',
          out: 'static/client.js',
          optimize: 'none',
          optimize: 'uglify2',
          include: [
            'app'
          ],
          name: '../../bower_components/almond/almond',
          generateSourceMaps: true,
          preserveLicenseComments: false
        }
      }
    }

  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s)
  grunt.registerTask('default', ['copy', 'less', 'handlebars', 'concat', 'requirejs']);

};

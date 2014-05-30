module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Compile LESS
    less: {
      compileBootstrap: {
        files: {
          "static/bootstrap/dist/css/bootstrap.css": "static/bootstrap/less/bootstrap.less"
        }
      },
      compileAppStyles: {
        options: {
          cleancss: true
        },
        files: {
          "static/client.css": "static/client.less"
        }
      }
    },
    // Compile Handlebars templates
    handlebars: {
      compile: {
        options: {
          namespace: "Templates",
          processName: function(filePath) {
            var pieces = filePath.split("/");
            var filename = pieces[pieces.length - 1];
            var base = filename.split('.');
            return base[0];
          }
        },
        files: {
          "static/handlebars-templates/templates.js": "static/handlebars-templates/*.hbs"
        }
      }
    },
    // Minify .js
    uglify: {
      options: {
        sourceMap: true
      },
      client: {
        files: {
          'static/pnotify/pnotify.min.js': ['static/pnotify/pnotify.core.js', 'static/pnotify/pnotify.desktop.js'],
          'static/handlebars-templates/handlebars-templates.min.js': ['static/handlebars-templates/helpers.js', 'static/handlebars-templates/templates.js'],
          'static/underscore/underscore.min.js': 'static/underscore/underscore.js',
          'static/backbone/backbone.min.js': 'static/backbone/backbone.js',
          'node_modules/backbone.io/lib/browser.min.js': 'node_modules/backbone.io/lib/browser.js',
          'static/photostream.min.js': 'static/photostream.js'
        }
      }
    },
    // Concatenate .js
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'static/jquery/dist/jquery.min.js',
          'static/pnotify/pnotify.min.js',
          'static/momentjs/min/moment.min.js',
          'static/filesize/lib/filesize.min.js',
          'static/handlebars/handlebars.min.js',
          'static/handlebars-templates/handlebars-templates.min.js',
          'static/underscore/underscore.min.js',
          'static/backbone/backbone.min.js',
          'node_modules/backbone.io/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.min.js',
          'node_modules/backbone.io/lib/browser.min.js',
          'static/imagesloaded/imagesloaded.pkgd.min.js',
          'static/photostream.min.js'
        ],
        dest: 'static/client.js',
      },
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s)
  grunt.registerTask('default', ['less', 'handlebars', 'uglify', 'concat']);

};
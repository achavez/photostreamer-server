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
    // Concatenate .js
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
          'static/jquery/dist/jquery.js',
          'static/pnotify/pnotify.core.js',
          'static/pnotify/pnotify.desktop.js',
          'static/momentjs/moment.js',
          'static/filesize/lib/filesize.js',
          'static/handlebars/handlebars.js',
          'static/handlebars-templates/helpers.js',
          'static/handlebars-templates/templates.js',
          'static/underscore/underscore.js',
          'static/backbone/backbone.js',
          'node_modules/backbone.io/node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js',
          'node_modules/backbone.io/lib/browser.js',
          'static/photostream.js'
        ],
        dest: 'static/client.js',
      },
    },
    // Minify .js
    uglify: {
      options: {
        mangle: false,
        sourceMap: true
      },
      client: {
        files: {
          'static/client.min.js': 'static/client.js'
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s)
  grunt.registerTask('default', ['less', 'handlebars', 'concat', 'uglify']);

};
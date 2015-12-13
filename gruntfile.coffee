module.exports = (grunt) ->

  #    Project configuration.
  grunt.initConfig {

    pkg: grunt.file.readJSON('package.json'),

    karma: {
      unit:
        configFile: 'karma.config.coffee'
    },

    coffee: {
      compile:
        options:
          bare: true
        files:
          "dist/js/main.js": "src/coffee/main.coffee"
    },

    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'dist/css/main.css': 'src/sass/main.scss'
            }
        }
    },

    watch: {
      coffee:
        files: ['src/coffee/**/*.coffee'],
        tasks: ['coffee']
      sass:
        files: ['src/sass/main.scss'],
        tasks: ['sass']
    },

    browserSync: {
      dev: {
        bsFiles: {
            src : [
                'dist/css/*.css',
                'dist/*.html',
                'dist/js/*.js'
            ]
        },
        options: {
            watchTask: true,
            server: './dist'
        }
      }
    }
  }

  #    Load the plugin
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-sass')
  grunt.loadNpmTasks('grunt-browser-sync');

  #   Default task
  grunt.registerTask( 'default', [
    'coffee',
    'sass',
    'browserSync',
    'watch',
  ])
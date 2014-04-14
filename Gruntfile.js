module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      pivotal: {
        src: 'src/game/*.js',
        options: {
          vendor: ['node_modules/underscore/underscore.js', 'node_modules/jquery/dist/jquery.js'],
          specs: 'spec/*Spec.js'
        }
      }
    },

    jshint: {
      all: ['Grunfile.js', 'src/**/*.js', 'spec/**/*.js']
    },

    watch: {
      scripts: {
        files: ['src/**/*.js', 'spec/*Spec.js'],
        tasks: ['jshint', 'jasmine'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'casperjs']);
};
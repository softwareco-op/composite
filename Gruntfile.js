module.exports = function(grunt) {

  var port = 8981;

  grunt.initConfig({
    mochaTest: {
      test: {
          options: {
              ui: 'bdd',
              reporter: 'spec',
              clearRequireCache: true
          },
          src:['test/test.server.js']
      }
    },
    copy: {
      dist: {
        files: [
          {src: ['backbone-gcl.js'], dest: './', cwd:'lib/', expand: true}
        ]
      }
    },
    uglify: {
      dist: {
        files: {
          'backbone-gcl.min.js': ['lib/backbone-gcl.js']
        }
      }
    },
    shell: {
      'mocha-phantomjs': {
        command: 'mocha-phantomjs -R spec http://localhost:' + port + '/testrunner.html',
        options: {
            stdout: true,
            stderr: true,
            failOnError:true
        }
      },
      'ci': {
        command: 'mocha-phantomjs -R spec http://localhost:' + port +'/testrunner.html',
        options: {
            stdout: true,
            stderr: true,
            failOnError:true
        }
      },
      'travis': {
        command: 'mocha-phantomjs testrunner.html',
        options: {
            stdout: true,
            stderr: true,
            failOnError:true
        }
      },
      'server': {
          command: 'node test/test.server.js',
          options: {
              stdout: true,
              stderr: true,
              failOnError:true
          }
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'util/web-server.js',
          watchedFolders: ['util']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: port,
          base: '.'
        }
      }
    },
    jshint: {
      options: {
          asi:true,
          laxcomma:true,
          lastsemic:true
      },
      tests: {
        options: {
          '-W030': true, // to.be.true syntax
        },
        src: ['test/**/*.js']
      },
      lib: ['Gruntfile.js', 'src/**/*.js']
    },
    watch: {
      jsFiles: {
        files: ['**/*.js', 'testrunner.html'],
        tasks: ['jshint', 'shell:server']
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', ['connect', 'shell:ci']);
  grunt.registerTask('build', ['copy', 'uglify']);
  grunt.registerTask('serverTest', ['mochaTest']);
  grunt.registerTask('default', ['nodemon']);
}

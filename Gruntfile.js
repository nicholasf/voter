path = require('path');
fs   = require('fs');

var ts = Date.now();

var paths = {
  stylus:   path.join(__dirname, 'public', 'stylesheets'),
  js:       path.join(__dirname, 'public', 'javascript'),
  views:    path.join(__dirname, 'views'),
  compiled: path.join(__dirname, 'public')
};

var allJSFiles = function () {
  var matcher = function(fn) { return /.*\.js/.test(fn); };
  var files   = fs.readdirSync(paths.js).filter( matcher );

  return files.map(function(fn) { return path.join(paths.js, fn); });
};

var jsAssets = {
  raw:      allJSFiles(),
  compiled: path.join(paths.compiled, 'app.'+ ts + '.js')
};

var stylusAssets = {
  raw:      [path.join(paths.stylus, "app.styl")],
  compiled: path.join(paths.compiled, 'app.'+ ts + '.css')
};

var jadeAssets = {
  raw:      [path.join(paths.views, "index.jade")],
  compiled: path.join(paths.compiled, "app.html")
};

console.log(JSON.stringify(jsAssets));

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: [
          path.join(paths.compiled, 'app.*.js'),
          path.join(paths.compiled, 'app.*.css'),
          path.join(paths.compiled, 'app.*.html')
        ]
      }
    },
    jade: {
      app: {
        src:  jadeAssets.raw,
        dest: jadeAssets.compiled,
        options: {
          pretty: true,
          data: { 
            assets:{
              js:  [jsAssets.compiled.replace(paths.compiled, '')],
              css: [stylusAssets.compiled.replace(paths.compiled, '')]
            }
          }
        }
      }
    },
    concat: {
      appJS: {
        src: jsAssets.raw,
        dest: jsAssets.compiled,
        options: {
          separator: ';\n'
        }
      }
    },
    stylus: {
      compile: {
        src:  stylusAssets.raw,
        dest: stylusAssets.compiled
      }
    },
    watch: {
      assets: {
        files: jsAssets.raw.concat(stylusAssets.raw, jadeAssets.raw),
        tasks: ['clean', 'concat:appJS', 'stylus', 'jade:app']
      }
    }
  });

  grunt.registerTask('default', ['clean', 'concat:appJS', 'stylus', 'jade:app']);
  grunt.registerTask('html',    ['jade:app']);
  grunt.registerTask('js',      ['concat:appJS']);
  grunt.registerTask('css',     ['stylus']);
};
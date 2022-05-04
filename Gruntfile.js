const vizName = 'viz-template';
const vizClassName = 'SomeClassName';

module.exports = function (grunt) {
  grunt.initConfig({
    includes: {
      js: {
        options: {
          includeRegexp: /^include\(+['"]?([^'"]+)['"]?\)*$/
        },
        files: [
          {
            src: ['main.js'],
            dest: 'temp/',
            cwd: 'src/js'
          }
        ]        
      },
      html: {
        src: [
          'index.html'          
        ],
        dest: 'temp/',
        cwd: 'src/html'
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: [{
          dest: `public/app.min.css`, src: "src/less/main.less"
        }]
      }
    },
    stylelint: {
      simple: {
        options: {
	        configFile: '.stylelintrc',
	        failOnError: true,
	        syntax: 'less'
	      },
	      src: [
	        'src/less/**/*.less'
	      ]
      }
    },
    eslint: {
      target: ['src/**/*.js', 'index.js'],
      options: {
        configFile: '.eslintrc'
      }
    },
    watch: {
      clientscript: {
        files: ['src/less/**/*.less','src/js/**/*.js', 'public/app.js'], // which files to watch
        tasks: ['includes', 'eslint', 'babel', 'stylelint', 'less', 'uglify', 'copy:main']        
      },
      views: {
        files: ['src/html/**/*.html'],
        tasks: ['includes', 'minifyHtml']
      }
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-object-assign', '@babel/plugin-transform-async-to-generator']  		
      },						
      dist: {
        files: [
          {
            dest: `public/app.js`, src: `temp/main.js`
          }
        ]
      }
  	},
    uglify:{
      options : {
        beautify : false,
        mangle   : true,
        compress: true
      },
      build: {
        files: [
          {
            dest: `public/app.min.js`, src: `public/app.js`
          }
        ]
      }
    },
    minifyHtml: {
  		options: {
  			cdata: true
  		},
  		dist: {
  			files: [
          {
            'public/index.html': 'temp/index.html'
  			  }
        ]
  		}
  	},
    copy: {      
      main: {
        files: [ 
          { 
            src: ['temp/main.js'], 
            dest: `public/app.debug.js`
          }          
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-minify-html');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.registerTask('default', ['stylelint', 'less', 'includes', 'eslint', 'babel', 'uglify', 'minifyHtml', 'copy:main', 'watch' ] );
  grunt.registerTask('build', ['stylelint', 'less', 'includes', 'eslint', 'babel', 'uglify', 'minifyHtml', 'copy:main'] );
};

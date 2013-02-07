// This is the build configuration file.  It is a Grunt file, which you can 
// read more about here: https://github.com/gruntjs/grunt/wiki/Configuring-tasks
module.exports = function(grunt) {

  grunt.initConfig({

    // Runs the application JavaScript through JSHint with the defaults.
    jshint: {
      files: ["app/**/*.js"]
    },

    // The jst task compiles all application templates into JavaScript
    // functions with the Lo-Dash template function.
    jst: {
      debug: {
        files: {
          "dist/debug/templates.js": ["app/templates/**/*.*"]
        }
      }
    },

    // This task simplifies working with CSS inside Backbone Boilerplate
    // projects.  Instead of manually specifying your stylesheets inside the
    // configuration, you can use `@imports` and this task will concatenate
    // only those paths.
    styles: {
      // Out the concatenated contents of the following styles into the below
      // development file path.
      "dist/debug/index.css": {
        // Point this to where your `index.css` file is location.
        src: "app/styles/index.css",

        // The relative path to use for the @imports.
        paths: ["app/styles"],

        // Point to where styles live.
        prefix: "app/styles/",

        // Additional production-only stylesheets here.
        additional: []
      }
    },

    // This task uses James Burke's excellent r.js AMD build tool.  In the
    // future other builders may be contributed as drop-in alternatives.
    requirejs: {
      options: {
        // Include the main configuration file.
        mainConfigFile: "app/config.js",

        deps: ["vendor/jam/require.config"],

        // Output file.
        out: "dist/debug/source.js",

        // Root application module.
        name: "config",

        // Leave optimization to our UglifyJS task.
        optimize: "none",

        // Show warnings
        logLevel: 2,

        // Ensure modules are inserted
        skipModuleInsertion: false,

        // Allow optional CommonJS modules to be automatically wrapped to
        // AMD.
        cjsTranslate: true,

        // Do not wrap everything in an IIFE.
        wrap: false
      }
    },

    // The concatenate task is used here to merge the almond require/define
    // shim and the templates into the application code.  It's named
    // dist/debug/require.js, because we want to only load one script file in
    // index.html.
    concat: {
      dist: {
        src: [
          "vendor/js/libs/almond.js",
          "dist/debug/templates.js",
          "dist/debug/require.js"
        ],

        dest: "dist/debug/require.js",

        separator: ";"
      }
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    mincss: {
      release: {
        files: {
          "dist/release/styles.css": ["dist/debug/styles.css"]
        }
      }
    },

    // Minify the application built source and generate source maps back to
    // the original debug build.
    uglify: {
      options: {
        sourceMap: "dist/release/",
        sourceMapRoot: "/",
        preserveComments: "some"
      },

      release: {
        files: {
          "dist/release/source.js": ["dist/debug/source.js"]
        }
      }
    },

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: ["dist/"],

    server: {
      map: {
        "source.js": "vendor/js/require.js",
        "styles.css": "app/styles/index.css"
      },

      debug: {
        map: {
          "source.js": "dist/debug/source.js",
          "styles.css": "dist/debug/styles.css"
        }
      },

      release: {
        map: {
          "source.js": "dist/release/source.js",
          "styles.css": "dist/release/styles.css"
        }
      }
    },

    // Move vendor and app logic during a build.
    copy: {
      debug: {
        files: [
          { src: ["app/**"], dest: "dist/debug/" },
          { src: "vendor/**", dest: "dist/debug/" }
        ]
      },

      release: {
        files: [
          { src: ["app/**"], dest: "dist/release/" },
          { src: "vendor/**", dest: "dist/release/" }
        ]
      }
    }

  });

  // Grunt contribution tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jst");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-mincss");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-requirejs");

  // Grunt BBB tasks.
  grunt.loadNpmTasks("grunt-bbb-server");
  //grunt.loadNpmTasks("grunt-bbb-styles");

  // This will reset the build, be the precursor to the production
  // optimizations, and serve as a good intermediary for debugging.
  grunt.registerTask("debug", [
    "clean", "jshint", "jst", "requirejs", //"concat", "copy" //"styles"
  ]);

  // The release task will first run the debug tasks.  Following that, minify
  // the built JavaScript and then minify the built CSS.
  grunt.registerTask("release", ["debug", "uglify", "mincss"]);

  // When running the default Grunt command, just lint the code.
  grunt.registerTask("default", ["jshint"]);
};

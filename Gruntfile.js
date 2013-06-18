// Grunt ration updated to latest Grunt.  That means your minimum
// version necessary to run these tasks is Grunt 0.4.
module.exports = function(grunt) {

  grunt.initConfig({
    // Easier location to change the default debug and release folders.
    dist: {
      debug: "dist/debug/",
      release: "dist/release/"
    },

    // Runs the application JavaScript through JSHint with the defaults.
    jshint: {
      files: ["app/**/*.js"]
    },

    // The jst task compiles all application templates into JavaScript
    // functions with the Lo-Dash template function.
    jst: {
      debug: {
        files: {
          "<%= dist.debug %>templates.js": ["app/templates/**/*.*"]
        }
      }
    },

    // This task simplifies working with CSS inside Backbone Boilerplate
    // projects.  Instead of manually specifying your stylesheets inside the
    // ration, you can use `@imports` and this task will concatenate
    // only those paths.
    styles: {
      // Out the concatenated contents of the following styles into the below
      // development file path.
      "<%= dist.debug %>app/styles/index.css": {
        // Point this to where your `index.css` file is location.
        src: "app/styles/index.css",

        // The relative path to use for the @imports.
        paths: ["app/styles"]
      }
    },

    // This task uses James Burke's excellent r.js AMD builder to take all
    // modules and concatenate them into a single file.
    requirejs: {
      debug: {
        options: {
          // Include the main ration file.
          mainConfigFile: "app/config.js",

          // Output file.
          out: "<%= dist.debug %>source.js",

          // Root application module.
          name: "config",

          // Include the main application.
          insertRequire: ["main"],

          // This will ensure the application runs after being built.
          include: ["app", "main", "router"],

          // Wrap everything in an IIFE.
          wrap: true
        }
      }
    },

    // Combine the Almond AMD loader and precompiled templates with the
    // application source code.
    concat: {
      dist: {
        src: [
          "vendor/bower/almond/almond.js",
          "<%= dist.debug %>templates.js",
          "<%= dist.debug %>source.js"
        ],

        dest: "<%= dist.debug %>source.js",

        separator: ";"
      }
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    cssmin: {
      release: {
        files: {
          "<%= dist.release %>styles.css": ["<%= dist.debug %>styles.css"]
        }
      }
    },

    // Minify the application built source and generate source maps back to
    // the original debug build.
    uglify: {
      options: {
        sourceMap: "<%= dist.release %>source.js.map",
        sourceMapRoot: "",
        sourceMapPrefix: 1,
        preserveComments: "some"
      },

      release: {
        files: {
          "<%= dist.release %>source.js": ["<%= dist.debug %>source.js"]
        }
      }
    },

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: ["dist/"],

    server: {
      options: {
        // Default server settings that are ideal for local development.
        host: "127.0.0.1",
        port: 8000,

        // Add any additional directories you want to automatically compile
        // CommonJS modules in.
        moduleDirs: [
          // Source.
          "app",

          // Testing directories.
          "test/jasmine/spec",
          "test/mocha/tests",
          "test/qunit/tests"
        ],

        // Root entry point during development is RequireJS, this loads the rest
        // of the application.
        map: { "source.js": "vendor/jam/require.js" }
      },

      development: {
        options: {}
      },

      debug: {
        options: {
          map: {
            // Source.
            "source.js": "<%= dist.debug %>source.js",

            // Styles.
            "app/styles/index.css": "<%= dist.debug %>styles.css"
          }
        }
      },

      release: {
        options: {
          map: {
            // Debugging.
            "source.js.map": "<%= dist.release %>source.js.map",
            "debug/source.js": "<%= dist.release %>debug/source.js",

            // Source.
            "source.js": "<%= dist.release %>source.js",

            // Styles.
            "app/styles/index.css": "<%= dist.release %>styles.css"
          }
        }
      },

      // Specifically used for testing the application.
      test: {
        options: {
          forever: false,
          port: 8001
        }
      }
    },

    // Move vendor and app logic during a build.
    copy: {
      debug: {
        files: [
          { src: ["app/**"], dest: "<%= dist.debug %>" },
          { src: "vendor/**", dest: "<%= dist.debug %>" },
          { src: "index.html", dest: "<%= dist.debug %>index.html" }
        ]
      },

      release: {
        files: [
          { src: ["app/**"], dest: "<%= dist.release %>" },
          { src: "vendor/**", dest: "<%= dist.release %>" },
          { src: "index.html", dest: "<%= dist.release %>index.html" },
          { src: "<%= dist.debug %>source.js", dest: "<%= dist.release %>debug/source.js" }
        ]
      }
    },

    compress: {
      release: {
        files: {
          "<%= dist.release %>source.js.gz": "<%= dist.release %>source.js",
          "<%= dist.release %>styles.css.gz": "<%= dist.release %>styles.css"
        }
      }
    },

    karma: {
      options: {
        basePath: process.cwd(),
        runnerPort: 9999,
        port: 9876,
        singleRun: true,
        colors: true,
        captureTimeout: 7000,

        reporters: ["progress"],
        browsers: ["PhantomJS"],

        plugins: [
          "karma-jasmine",
          "karma-mocha",
          "karma-qunit",
          "karma-chrome-launcher",
          "karma-firefox-launcher",
          "karma-phantomjs-launcher"
        ],

        proxies: {
          "/base": "http://localhost:<%=server.test.options.port%>"
        }
      },

      jasmine: {
        options: {
          frameworks: ["jasmine"],

          files: [
            "test/jasmine/vendor/jasmine-html.js",
            "vendor/jam/require.js",
            "test/jasmine/test-runner.js"
          ]
        }
      },

      mocha: {
        options: {
          frameworks: ["mocha"],

          files: [
            "test/mocha/vendor/chai.js",
            "vendor/jam/require.js",
            "test/mocha/test-runner.js"
          ]
        }
      },

      qunit: {
        options: {
          frameworks: ["qunit"],

          files: [
            "vendor/jam/require.js",
            "test/qunit/test-runner.js"
          ]
        }
      }
    }
  });

  // Grunt contribution tasks.
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jst");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-compress");

  // Third-party tasks.
  grunt.loadNpmTasks("grunt-karma-0.9.1");

  // Grunt BBB tasks.
  grunt.loadNpmTasks("grunt-bbb-server");
  grunt.loadNpmTasks("grunt-bbb-requirejs");
  grunt.loadNpmTasks("grunt-bbb-styles");

  // This will reset the build, be the precursor to the production
  // optimizations, and serve as a good intermediary for debugging.
  grunt.registerTask("debug", [
    "clean", "jshint", "jst", "requirejs", "concat", "styles"
  ]);

  // The release task will first run the debug tasks.  Following that, minify
  // the built JavaScript and then minify the built CSS.
  grunt.registerTask("release", [
    "debug", "copy:release", "uglify", "cssmin", "compress"
  ]);

  // The test task take care of starting test server and running tests.
  grunt.registerTask("test", ["jshint", "server:test", "karma"]);

  // When running the default Grunt command, just lint the code.
  grunt.registerTask("default", ["jshint"]);

};

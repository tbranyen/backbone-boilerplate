// Grunt configuration updated to latest Grunt.  That means your minimum
// version necessary to run these tasks is Grunt 0.4.
module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    // Empty and remove `dist/` directory.
    clean: ["dist/"],

    // Run your source code through JSHint's defaults.
    jshint: ["app/**/*.js"],

    // This task uses James Burke's excellent r.js AMD builder to take all
    // modules and concatenate them into a single file.
    requirejs: {
      debug: {
        options: {
          // Include the main ration file.
          mainConfigFile: "app/config.js",

          // Output file.
          out: "dist/source.js",

          // Root application module.
          name: "almond",

          // Set the Bootstrap as the main entry point.
          main: "bootstrap",

          // Since we bootstrap with nested `require` calls this option allows
          // R.js to find them.
          findNestedDependencies: true,

          // Wrap everything in an IIFE.
          wrap: true
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
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-compress");

  // Third-party tasks.
  grunt.loadNpmTasks("grunt-karma");

  // Grunt BBB tasks.
  grunt.loadNpmTasks("grunt-bbb-server");
  grunt.loadNpmTasks("grunt-bbb-requirejs");
  grunt.loadNpmTasks("grunt-bbb-styles");

  // When running the default Grunt command, just lint the code.
  grunt.registerTask("default", [
    "clean", "jshint", "requirejs", "styles", "cssmin", "copy", "compress"
  ]);

  // The test task take care of starting test server and running tests.
  grunt.registerTask("test", ["jshint", "server:test", "karma"]);
};

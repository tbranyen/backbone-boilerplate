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
      release: {
        options: {
          // Include the main ration file.
          mainConfigFile: "app/config.js",

          baseUrl: "dist/app",

          // Include Almond to slim down the built filesize.
          name: "almond",

          // Set the Bootstrap as the main entry point.
          include: ["bootstrap"],
          insertRequire: ["bootstrap"],

          // Since we bootstrap with nested `require` calls this option allows
          // R.js to find them.
          findNestedDependencies: true,

          // Wrap everything in an IIFE.
          wrap: true,

          // Output file.
          out: "dist/source.js",

          // Enable Source Map generation.
          generateSourceMaps: true,

          // Do not preserve any license comments when working with source maps.
          // These options are incompatible.
          preserveLicenseComments: false,

          // Minify using UglifyJS.
          optimize: "uglify2"
        }
      }
    },

    // This task simplifies working with CSS inside Backbone Boilerplate
    // projects.  Instead of manually specifying your stylesheets inside the
    // HTML, you can use `@imports` and this task will concatenate only those
    // paths.
    styles: {
      // Out the concatenated contents of the following styles into the below
      // development file path.
      "dist/styles.css": {
        // Point this to where your `index.css` file is location.
        src: "app/styles/index.css",

        // The relative path to use for the @imports.
        paths: ["app/styles"],

        // Rewrite image paths during release to be relative to the `img`
        // directory.
        forceRelative: "/app/img/"
      }
    },

    // Minfiy the distribution CSS.
    cssmin: {
      release: {
        files: {
          "dist/styles.min.css": ["dist/styles.css"]
        }
      }
    },

    server: {
      options: {
        // Ideal default server settings for development.
        host: "0.0.0.0",
        port: 8000
      },

      development: {
        options: {
          map: {
            // Source.
            "source.js": "vendor/bower/requirejs/require.js",
          }
        }
      },

      release: {
        options: {
          map: {
            // Debugging.
            "source.js.map": "dist/source.js.map",

            // Source.
            "source.js": "dist/source.js",

            // Styles.
            "app/styles/index.css": "dist/styles.min.css"
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
      release: {
        files: [
          { src: ["app/**"], dest: "dist/" },
          { src: "vendor/**", dest: "dist/" },
          { src: "index.html", dest: "dist/index.html" }
        ]
      }
    },

    // Provide a static GZip build that can be used with compatible servers.
    compress: {
      release: {
        files: {
          "dist/source.js.gz": "dist/source.js",
          "dist/styles.min.css.gz": "dist/styles.min.css"
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
    "clean", "jshint", "copy", "requirejs", "styles", "cssmin", "compress"
  ]);

  // The test task take care of starting test server and running tests.
  grunt.registerTask("test", ["jshint", "server:test", "karma"]);
};

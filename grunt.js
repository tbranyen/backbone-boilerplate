// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
module.exports = function(grunt) {

  grunt.initConfig({

    // The lint task will run the build configuration and the application
    // JavaScript through JSHint and report any errors.  You can change the
    // options for this task, by reading this:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md
    lint: {
      files: [
        "build/config.js", "app/**/*.js"
      ]
    },

    // The jshint option for scripturl is set to lax, because the anchor
    // override inside main.js needs to test for them so as to not accidentally
    // route.
    jshint: {
      options: {
        scripturl: true
      }
    },

    // The jst task compiles all application templates into JavaScript
    // functions with the underscore.js template function from 1.2.4.  You can
    // change the namespace and the template options, by reading this:
    // https://github.com/gruntjs/grunt-contrib/blob/master/docs/jst.md
    //
    // The concat task depends on this file to exist, so if you decide to
    // remove this, ensure concat is updated accordingly.
    jst: {
      "dist/debug/templates.js": [
        "app/templates/**/*.html"
      ]
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
      // Include the main configuration file.
      mainConfigFile: "app/config.js",

      // Also include the JamJS configuration file.
      jamConfig: "/vendor/jam/require.config.js",

      // Output file.
      out: "dist/debug/require.js",

      // Root application module.
      name: "config",

      // Do not wrap everything in an IIFE.
      wrap: false
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
      "dist/release/index.css": [
        "dist/debug/index.css"
      ]
    },

    // Takes the built require.js file and minifies it for filesize benefits.
    min: {
      "dist/release/require.js": [
        "dist/debug/require.js"
      ]
    },

    // Running the server without specifying an action will run the defaults,
    // port: 8000 and host: 127.0.0.1.  If you would like to change these
    // defaults, simply add in the properties `port` and `host` respectively.
    // Alternatively you can omit the port and host properties and the server
    // task will instead default to process.env.PORT or process.env.HOST.
    //
    // Changing the defaults might look something like this:
    //
    // server: {
    //   host: "127.0.0.1", port: 9001
    //   debug: { ... can set host and port here too ...
    //  }
    //
    //  To learn more about using the server task, please refer to the code
    //  until documentation has been written.
    server: {
      // Ensure the favicon is mapped correctly.
      files: { "favicon.ico": "favicon.ico" },

      // For styles.
      prefix: "app/styles/",

      debug: {
        // Ensure the favicon is mapped correctly.
        files: "<config:server.files>",

        // Map `server:debug` to `debug` folders.
        folders: {
          "app": "dist/debug",
          "vendor/js/libs": "dist/debug",
          "app/styles": "dist/debug"
        }
      },

      release: {
        // This makes it easier for deploying, by defaulting to any IP.
        host: "0.0.0.0",

        // Ensure the favicon is mapped correctly.
        files: "<config:server.files>",

        // Map `server:release` to `release` folders.
        folders: {
          "app": "dist/release",
          "vendor/js/libs": "dist/release",
          "app/styles": "dist/release"
        }
      }
    },

    // The headless QUnit testing environment is provided for "free" by Grunt.
    // Simply point the configuration to your test directory.
    qunit: {
      all: ["test/qunit/*.html"]
    },

    // The headless Jasmine testing is provided by grunt-jasmine-task. Simply
    // point the configuration to your test directory.
    jasmine: {
      all: ["test/jasmine/*.html"]
    },

    // The watch task can be used to monitor the filesystem and execute
    // specific tasks when files are modified.  By default, the watch task is
    // available to compile CSS if you are unable to use the runtime compiler
    // (use if you have a custom server, PhoneGap, Adobe Air, etc.)
    watch: {
      files: ["grunt.js", "vendor/**/*", "app/**/*"],
      tasks: "styles"
    },

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: ["dist/"],

    // If you want to generate targeted `index.html` builds into the `dist/`
    // folders, uncomment the following configuration block and use the
    // conditionals inside `index.html`.
    //targethtml: {
    //  debug: {
    //    src: "index.html",
    //    dest: "dist/debug/index.html"
    //  },
    //
    //  release: {
    //    src: "index.html",
    //    dest: "dist/release/index.html"
    //  }
    //},
    
    // This task will copy assets into your build directory,
    // automatically.  This makes an entirely encapsulated build into
    // each directory.
    //copy: {
    //  debug: {
    //    files: {
    //      "dist/debug/app/": "app/**",
    //      "dist/debug/vendor/": "vendor/**"
    //    }
    //  },

    //  release: {
    //    files: {
    //      "dist/release/app/": "app/**",
    //      "dist/release/vendor/": "vendor/**"
    //    }
    //  }
    //}

  });

  // The debug task will remove all contents inside the dist/ folder, lint
  // all your code, precompile all the underscore templates into
  // dist/debug/templates.js, compile all the application code into
  // dist/debug/require.js, and then concatenate the require/define shim
  // almond.js and dist/debug/templates.js into the require.js file.
  grunt.registerTask("debug", "clean lint jst requirejs concat styles");

  // The release task will run the debug tasks and then minify the
  // dist/debug/require.js file and CSS files.
  grunt.registerTask("release", "debug min mincss");

};

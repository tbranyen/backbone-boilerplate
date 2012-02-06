// This is a JavaScript file, you can define any functions you would like in
// here.
config.init({

  clean: {
    folder: "dist/"
  },

  lint: {
    files: ["build/config.js", "app/**/*.js"]
  },

  jst: {
    "dist/debug/templates.js": ["app/templates/**/*.html"]
  },

  concat: {
    "dist/debug/require.js": [
      "assets/js/libs/almond.js",
      "dist/debug/templates.js",
      "dist/debug/require.js"
    ]
  },

  watch: {
    files: ["app/**/*", "assets/**/*"],
    tasks: "lint:files requirejs",
    
    min: {
      files: "<watch:files>",
      tasks: "default min mincss"
    }
  },

  mincss: {
    "dist/release/index.css": [
      "assets/css/style.css"
    ]
  },

  min: {
    "dist/release/require.js": ["dist/debug/require.js"]
  },

  server: {
    debug: {
      folders: {
        "app": "dist/debug",
        "app/templates": "app/templates",
        "assets/js/libs": "dist/debug"
      }
    },

    release: {
      files: {
        "app/config.js": "app/config.js"
      },

      folders: {
        "app": "dist/release",
        "app/templates": "app/templates",
        "assets/js/libs": "dist/release",
        "assets/css": "dist/release"
      }
    }
  },

  requirejs: {
    // Include the main configuration file
    mainConfigFile: "app/index.js",

    // Output file
    out: "dist/debug/require.js",

    // Where modules live
    dir: ".",
    baseUrl: "app",

    // Root application module
    name: "index",

    // Do not wrap everything in an IIFE
    wrap: false
  }

});

// Run the following tasks...
task.registerTask("default", "clean lint jst requirejs concat");

// This is the main Backbone Boilerplate build configuration file.

// This is a JavaScript file, you can define any functions you would like in
// here.
config.init({

  lint: {
    files: ["build/config.js", "app/**/*.js"]
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
    "dist/release/style.css": ["assets/css/**/*.css"]
  },

  min: {
    "dist/release/index.js": ["dist/debug/index.js"],
    "dist/release/require.js": ["assets/js/libs/require.js"]
  },

  clean: {
    folder: "dist/"
  },

  server: {
    debug: {
      port: 8000,

      paths: {
        "app": "dist/debug",
        "app/templates": "app/templates"
      }
    },

    release: {
      port: 8000,

      paths: {
        "app": "dist/release",
        "app/templates": "app/templates",
        "assets/js/libs": "dist/release",
        "assets/css": "dist/release"
      }
    }
  },

  requirejs: {
    // Put any valid require.js configuration options here.
    // There are already plenty of defaults baked in to
    // get you going!
  }

});

// Run the following tasks...
task.registerTask("default", "clean lint requirejs");

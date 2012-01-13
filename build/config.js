// This is the main Backbone Boilerplate build configuration file.
//
// This is a JavaScript file, you can define any functions you would like in
// here.
config.init({

  lint: {
    files: ["build/config.js", "app/**/*.js"]
  },

  watch: {
    files: "<lint:files>",
    tasks: "lint:files requirejs",
    
    min: {
      files: "<watch:files>",
      tasks: "default min"
    }
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
        "assets/js/libs": "dist/release"
      }
    }
  },

  requirejs: {
    use: {
      backbone: {
        deps: ["use!underscore", "jquery", "order!backbone"],
        attach: "Backbone"
      },

      underscore: {
        deps: ["underscore"],
        attach: "_"
      }
    }
  }

});

// Run the following tasks...
task.registerTask("default", "clean lint requirejs");

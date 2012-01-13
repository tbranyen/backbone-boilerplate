// This is the main Backbone Boilerplate build configuration file.
//
// This is a JavaScript file, you can define any functions you would like in
// here.
config.init({

  lint: {
    files: ["build/config.js", "app/**/*.js"]
  },

  watch: {
    files: ["<lint:files>"],
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
    port: 8000,

    paths: {
      "app": "dist/debug"
    }
  },

  requirejs: {
    use: {
      "libs/backbone": {
        deps: ["use!libs/underscore", "jquery", "order!libs/backbone"],
        attach: function() {
          return this.Backbone.noConflict();
        }
      },

      "libs/underscore": {
        deps: ["libs/underscore"],
        attach: "_"
      }
    }
  }

});

// Run the following tasks...
task.registerTask("default", "clean lint requirejs min");

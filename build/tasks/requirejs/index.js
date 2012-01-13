// ============================================================================
// TASKS
// ============================================================================

task.registerTask("requirejs", "require.js builder", function() {
  var options = config("requirejs") || {};

  // Merge passed options into defaults
  options = underscore.defaults(options, {
    // Do not optimize
    optimize: "none",

    // Show warnings
    logLevel: 2,

    // Ensure modules are inserted
    skipModuleInsertion: false,

    // Output directory
    out: "dist/debug/index.js",

    // Where modules live
    dir: ".",
    baseUrl: "app",

    // Root application module
    name: "index",

    // Default shims for popular libaries
    use: {
      backbone: {
        deps: ["use!underscore", "jquery", "order!backbone"],
        attach: function() {
          return this.Backbone.noConflict();
        }
      },

      underscore: {
        deps: ["underscore"],
        attach: "_"
      }
    }
  });

  options.paths = options.paths || {};

  // Custom paths seem to be necessary for this boilerplate structure
  options.paths = underscore.defaults(options.paths, {
    // Core libraries
    libs: "../assets/js/libs",
    jquery: "../assets/js/libs/jquery",

    // Plugins
    order: "../assets/js/plugins/order",
    use: "../assets/js/plugins/use"
  });

  // Run the r.js helper
  task.helper("r.js", options, function(response) {
    // Print out response
    log.writeln(response);
  });
});

// ============================================================================
// HELPERS
// ============================================================================

// r.js!
task.registerHelper("r.js", function(options, done) {
  require("requirejs").optimize(options, done);
});

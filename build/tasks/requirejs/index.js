// ============================================================================
// TASKS
// ============================================================================

task.registerTask("requirejs", "require.js builder", function() {
  var options = config("requirejs") || {};

  // Merge passed options into defaults
  options = underscore.extend({}, {
    // Do not optimize
    optimize: "none",

    // Show warnings
    logLevel: 2,

    // Ensure modules are inserted
    skipModuleInsertion: false,
  }, options);

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

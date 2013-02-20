// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
requirejs.config({
  // Put additional configuration options here.
  paths: {
    "vendor": "../vendor"
  }
});

// Ensure the Jam configuration is loaded before configuring and loading the
// rest of the application.
require(["vendor/jam/require.config"], function() {
  // Now include the main application entry point.
  require(["main"]);
});

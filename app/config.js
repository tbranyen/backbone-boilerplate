// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
  // Ensure the Jam configuration is loaded before configuring and loading
  // the rest of the application.
  shim: { "app": ["../vendor/jam/require.config"] },

  // Include the main application entry point.
  deps: ["app"]
});

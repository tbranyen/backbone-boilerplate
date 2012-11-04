// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["../vendor/jam/require.config", "main"],

  paths: {
    // JavaScript folders.
    libs: "../assets/js/libs",
    vendor: "../assets/vendor"
  },

  shim: {
    // Put shims here.
  }

});

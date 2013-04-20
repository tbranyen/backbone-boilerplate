// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
  paths: {
    // Make vendor easier to access.
    "vendor": "../vendor"
  },

  map: {
    // Opt for Lo-Dash Underscore compatibility build.
    "*": { "underscore": "vendor/jam/lodash/dist/lodash.underscore" }
  },

  // This should help with cache issues related to development.
  urlArgs: "bust=" + Number(new Date())
});

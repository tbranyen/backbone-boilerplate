// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
  paths: {
    // Make vendor easier to access.
    "vendor": "../vendor",

    // Opt for Lo-Dash Underscore compatibility build.
    "underscore": "../vendor/jam/lodash/dist/lodash.underscore"
  }
});

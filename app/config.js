// This is the runtime configuration file.  It complements the Gruntfile.js by
// supplementing shared properties.
require.config({
  // Make vendor easier to access.
  paths: {
    "vendor": "../vendor"
  },

  // This should help with cache issues related to development.
  urlArgs: "bust=" + Number(new Date())
});

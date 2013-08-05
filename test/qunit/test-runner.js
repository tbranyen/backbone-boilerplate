// Make async.
if (window.__karma__) {
  window.__karma__.loaded = function() {};
}

// Set the application endpoint and load the configuration.
require.config({
  paths: {
    // Testing libraries.
    "qunit": "../vendor/bower/qunit/qunit/qunit",

    // Location of tests.
    spec: "../test/qunit/spec",
    specs: "../test/qunit/specs"
  },

  shim: {
    "qunit": { exports: "qunit" }
  },

  // Determine the baseUrl if we are in Karma or not.
  baseUrl: window.__karma__ ? "base/app" : "../../app"
});

require([
  "config",
  "specs",
  "qunit"
],

function(config, specs, qunit) {
  // Disable auto start.  We'll call start once the async modules have
  // loaded.
  QUnit.config.autostart = false;

  // Load all specs.
  require(specs.specs, function() {
    if (window.__karma__) {
      // This will start Karma if it exists.
      window.__karma__.start();
    } else {
      // Only once the dependencies have finished loading, call Qunit.start.
      QUnit.start();
    }

  });
});

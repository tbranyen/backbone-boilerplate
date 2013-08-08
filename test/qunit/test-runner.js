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
    "qunit": {
      init: function() {
        if (window.__karma__) {
          // Disable auto start.  We'll call start once the async modules have
          // loaded.
          this.QUnit.config.autostart = false;
        } else {
          // If we're running in the browser, we can initialize QUnit now.
          this.QUnit.init();
        }

        return this.QUnit;
      }
    }
  },

  // Determine the baseUrl if we are in Karma or not.
  baseUrl: window.__karma__ ? "base/app" : "../../app"
});

require([
  "config",
  "qunit"
],

function(config, QUnit) {
  require(["specs"], function(specs) {
    // Load all specs.
    require(specs.specs, function() {

      if (window.__karma__) {
        // This will start Karma if it exists.
        return window.__karma__.start();
      }

      // Only once the dependencies have finished loading, call Qunit.start.
      QUnit.start();

    });
  });
});

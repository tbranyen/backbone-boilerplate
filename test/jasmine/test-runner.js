// Make async.
if (window.__karma__) {
  window.__karma__.loaded = function() {};
}

// Set the application endpoint and load the configuration.
require.config({
  paths: {
    // Testing libraries.
    "jasmine": "../vendor/bower/jasmine/lib/jasmine-core/jasmine",
    "jasmine-html": "../vendor/bower/jasmine/lib/jasmine-core/jasmine-html",
  
    // Location of tests.
    spec: "../test/jasmine/spec",
    specs: "../test/jasmine/specs"
  },

  shim: {
    "jasmine": { exports: "jasmine" },
    "jasmine-html": ["jasmine"]
  },

  // Determine the baseUrl if we are in Karma or not.
  baseUrl: window.__karma__ ? "base/app" : "../../app"
});

require([
  "config",
  "jasmine",
  "jasmine-html"
],

function(config, jasmine) {
  require(["specs"], function(specs) {
    // Load all specs.
    require(specs.specs, function() {

      if (window.__karma__) {
        // This will start Karma if it exists.
        window.__karma__.start();
      } else {
        // Set up the jasmine reporters once each spec has been loaded.
        jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
        jasmine.getEnv().execute();
      }

    });
  });
});

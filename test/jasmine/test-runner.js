var specs = [

  // Load the example spec, replace this and add your own spec.
  "spec/example.spec",

  // Ensure the boilerplate functions correctly.
  "spec/boilerplate/router.spec"

];

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
    spec: "../test/jasmine/spec"
  },

  shim: {
    "jasmine-html": ["jasmine"]
  },

  // Determine the baseUrl if we are in Karma or not.
  baseUrl: window.__karma__ ? "base/app" : "../../app"
});

// Load the configuration and testing libraries first.
require(["config", "jasmine", "jasmine-html"], function() {
  // Load all specs.
  require(specs, function() {

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

var specs = [

  // Load the example spec, replace this and add your own spec.
  "spec/example.spec",

  // Ensure the boilerplate functions correctly.
  "spec/boilerplate/router.spec"

];

// Set the application endpoint and load the configuration.
require({
  paths: { spec: "../test/jasmine/spec" },

  // Determine the baseUrl if we are in Karma or not.
  baseUrl: window.__karma__ ? "base/app" : "../../app"
}, ["config", "../vendor/jam/require.config"], function() {
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

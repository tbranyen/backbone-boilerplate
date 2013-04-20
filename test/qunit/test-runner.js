var tests = [

  // Load the example tests, replace this and add your own tests.
  "tests/example",

  // Ensure the boilerplate functions correctly.
  "tests/boilerplate/router"

];

// Make async.
if (window.__karma__) {
  window.__karma__.loaded = function() {};
}

// Disable auto start.  We'll call start once the async moduels have
// loaded.
QUnit.config.autostart = false;

// Set the application endpoint and load the configuration.
require({
  paths: { tests: "../test/qunit/tests" },

  // Determine the baseUrl if we are in Karma or not.
  baseUrl: window.__karma__ ? "base/app" : "../../app"
}, ["config", "../vendor/jam/require.config"], function() {
  // Load all tests.
  require(tests, function() {

    // Only once the dependencies have finished loading, call QUnit.start.
    QUnit.start();

    // This will start Karma if it exists.
    if (window.__karma__) {
      window.__karma__.start();
    }
  
  });
});

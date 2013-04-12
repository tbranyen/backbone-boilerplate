var tests = [

  // Load the example tests, replace this and add your own tests.
  "tests/example",

  // Ensure the boilerplate functions correctly.
  "tests/boilerplate/router"

];

// Set up the assertion library and the set up Mocha with the BDD interface
// Fell free to use any assertion library: http://visionmedia.github.io/mocha/#assertions
// and your favorite interface: http://visionmedia.github.io/mocha/#interfaces
window.expect = chai.expect;
mocha.setup({
  ui: "bdd"
});

// Set the application endpoint and load the configuration.
require({
  paths: { tests: "../test/mocha/tests" },

  // Determine the baseUrl if we are in Karma or not.
  baseUrl: window.__karma__ ? "base/app" : "../../app"
}, ["config", "../vendor/jam/require.config"], function() {
  // Load all tests.
  require(tests, function() {

    // Only once the dependencies have finished loading, call mocha.run.
    mocha.run();

    // This will start Karma if it exists.
    if (window.__karma__) {
      window.__karma__.start();
    }
  
  });
});

var tests = [

  // Load the example tests, replace this and add your own tests.
  "tests/example",

  // Ensure the boilerplate functions correctly.
  "tests/boilerplate/router"

];

// Prefer the BDD testing style.
mocha.setup("bdd");

// Make async.
if (window.__karma__) {
  window.__karma__.loaded = function() {};
}

// Set up the assertion library.
// Compatible libraries: http://visionmedia.github.io/mocha/#assertions
window.expect = chai.expect;

require({
  // Set the application endpoint.
  paths: { tests: "../test/mocha/tests" },

  // Determine the baseUrl if we are in Karma or not.
  baseUrl: window.__karma__ ? "base/app" : "../../app"
},

// Load the configuration.
["config"],

function() {
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

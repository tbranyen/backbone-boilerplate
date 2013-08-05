// Prefer the BDD testing style.
mocha.setup("bdd");

// Set up the assertion library.
// Compatible libraries: http://visionmedia.github.io/mocha/#assertions
window.expect = chai.expect;

// Make async.
if (window.__karma__) {
  window.__karma__.loaded = function() {};
}

// Set the application endpoint and load the configuration.
require.config({
  paths: {
    // Testing libraries.
    "chai": "../vendor/bower/chai/chai",
    "mocha": "../vendor/bower/mocha/mocha",

    // Location of tests.
    spec: "../test/mocha/spec",
    specs: "../test/mocha/specs"
  },

  shim: {
    "mocha": { exports: "mocha" }
  },

  // Determine the baseUrl if we are in Karma or not.
  baseUrl: window.__karma__ ? "base/app" : "../../app"
});

require([
  "config",
  "specs",
  "mocha"
],

function(config, specs, mocha) {
  // Load all specs.
  require(specs.specs, function() {

    if (window.__karma__) {
      // This will start Karma if it exists.
      window.__karma__.start();
    } else {
      // Only once the dependencies have finished loading, call mocha.run.
      mocha.run();
    }

  });
});

// Make async.
if (window.__karma__) {
  window.__karma__.loaded = function() {};
}

// Set the application endpoint and load the configuration.
require.config({
  paths: {
    // Testing libraries.
    "mocha": "../vendor/bower/mocha/mocha",
    "chai": "../vendor/bower/chai/chai",

    // Location of tests.
    spec: "../test/mocha/spec",
    specs: "../test/mocha/specs"
  },

  shim: {
    "mocha": { exports: "mocha", deps: ["chai"] }
  },

  // Determine the baseUrl if we are in Karma or not.
  baseUrl: window.__karma__ ? "base/app" : "../../app"
});

require([
  "config",
  "mocha"
],

function(config, mocha) {
  // Set up the assertion library.
  // Compatible libraries: http://visionmedia.github.io/mocha/#assertions
  window.expect = require("chai").expect;

  // Prefer the BDD testing style outside of Karma's runner.
  if (!window.__karma__) {
    mocha.setup("bdd");
  }

  require(["specs"], function(specs) {
    // Load all specs.
    require(specs.specs, function() {

      if (window.__karma__) {
        // This will start Karma if it exists.
        return window.__karma__.start();
      }

      // Only once the dependencies have finished loading, call mocha.run.
      mocha.run();

    });
  });
});

window.__karma__.loaded = function() {};

// Set the application endpoint and load the configuration.
require.config({
  paths: {
    chai: "../vendor/bower/chai/chai",
    underscore: "../vendor/bower/lodash/dist/lodash.underscore",

    spec: "../test/mocha/spec"
  },

  baseUrl: "base/app"
});

require([
  "config",
  "chai",
  "underscore"
],

function(config, chai, _) {
  window.expect = chai.expect;

  // Store all located tests in a global cache.
  var specs = _.reduce(window.__karma__.files, function(memo, id, file) {
    if (/\.spec\.js$/.test(file)) {
      memo.push(file);
    }

    return memo;
  }, []);

  // Load all specs.
  require(specs, function() {
    // This will start Karma if it exists.
    window.__karma__.start();
  });
});

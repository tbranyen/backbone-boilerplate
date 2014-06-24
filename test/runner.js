(function(window) {
  "use strict";

  var karma = window.__karma__;

  // Put Karma into an asynchronous waiting mode until we have loaded our
  // tests.
  karma.loaded = function() {};

  if (window.QUnit) {
    // Disable auto start.  We'll call start once the async modules have
    // loaded.
    window.QUnit.config.autostart = false;
  } else if (window.chai) {
    // Optionally use chai with Mocha.
    window.expect = window.chai.expect;
  }

  // Set the application endpoint and load the configuration.
  require.config({
    paths: {
      underscore: "../bower_components/lodash/dist/lodash.underscore"
    },

    baseUrl: "base/app"
  });

  require([
    "config",
    "underscore"
  ],

  function(config, _) {
    // Ensure templates can be found correctly.
    require.config({
      lodashLoader: {
        root: "/base/app/templates"
      }
    });

    var specs = _.chain(karma.files)
      // Convert the files object to an array of file paths.
      .map(function(id, file) { return file; })
      // Tests that end with `.spec.js' and existing either `app` or `test`
      // directories are automatically loaded.
      .filter(function(file) {
        return /^\/base\/(app|test)\/.*\.spec\.js$/.test(file);
      })
      .value();

    // Load all specs and start Karma.
    require(specs, karma.start);
  });
})(this);

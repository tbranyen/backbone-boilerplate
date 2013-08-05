module.exports = function(config) {
  config.set({
    frameworks: [ "qunit" ],
    files: [
      "vendor/bower/requirejs/require.js",
      "test/qunit/test-runner.js"
    ]
  });
};

module.exports = function(config) {
  config.set({
    frameworks: [ "mocha" ],
    files: [
      "vendor/bower/chai/chai.js",
      "vendor/bower/requirejs/require.js",
      "test/mocha/test-runner.js"
    ]
  });
};

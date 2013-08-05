module.exports = function(config) {
  config.set({
    frameworks: [ "mocha" ],
    files: [
      "test/mocha/vendor/chai.js",
      "vendor/bower/requirejs/require.js",
      "test/mocha/test-runner.js"
    ]
  });
};

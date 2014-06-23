module.exports = ->
  @loadNpmTasks "grunt-karma"

  # Change this to the framework you want to use.
  framework = "mocha"

  # Unit testing is provided by Karma.  Change the two commented locations
  # below to either: mocha, jasmine, or qunit.
  @config "karma",
    options:
      basePath: process.cwd()
      singleRun: true
      captureTimeout: 7000
      autoWatch: true
      logLevel: "ERROR"

      reporters: ["dots", "coverage"]
      browsers: ["PhantomJS"]

      frameworks: [framework]

      plugins: [
        "karma-jasmine"
        "karma-mocha"
        "karma-qunit"
        "karma-phantomjs-launcher"
        "karma-coverage"
      ]

      preprocessors:
        "app/**/*.js": "coverage"

      coverageReporter:
        type: "lcov"
        dir: "test/coverage"

      files: [
        # You can optionally remove this or swap out for a different expect.
        "vendor/bower/assert/assert.js"
        "vendor/bower/requirejs/require.js"
        "test/runner.js"

        { pattern: "app/**/*.*", included: false }
        {
          pattern: "test/#{framework}/**/*.spec.js",
          included: false
        }
        { pattern: "vendor/**/*.js", included: false }
      ]

    # This creates a server that will automatically run your tests when you
    # save a file and display results in the terminal.
    daemon:
      options:
        singleRun: false

    # This is useful for running the tests just once.
    run:
      options:
        singleRun: true

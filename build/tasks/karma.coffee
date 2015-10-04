module.exports = ->
  @loadNpmTasks 'grunt-karma'

  # Unit testing is provided by Karma.  Change the two commented locations
  # below to either: mocha, jasmine, or qunit.
  @config 'karma',
    options:
      basePath: process.cwd()
      singleRun: true
      captureTimeout: 7000
      autoWatch: true
      logLevel: 'ERROR'

      reporters: ['dots']
      browsers: ['PhantomJS']

      frameworks: ['mocha']

      plugins: [
        'karma-mocha'
        'karma-phantomjs-launcher'
      ]

      files: [
        'test/assert.js'
        'dist/test-runner.js'
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

module.exports = ->
  @loadNpmTasks 'grunt-browserify'

  # This task uses the Browserify optimizer and the Babelify transform to
  # optimize the ES6 modules.
  @config 'browserify',
    options:
      transform: ['babelify']
      watch: true

    development:
      src: 'app/index.js'
      dest: 'dist/source.js'

    production:
      src: 'app/index.js'
      dest: 'dist/source.min.js'

    testing:
      src: 'test/runner.js'
      dest: 'dist/test-runner.js'

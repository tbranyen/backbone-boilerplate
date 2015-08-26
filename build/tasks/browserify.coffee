module.exports = ->
  @loadNpmTasks 'grunt-browserify'

  # This task uses James Burke's excellent r.js AMD builder to take all modules
  # and concatenate them into a single file.
  @config 'browserify',
    options:
      transform: ['babelify']
      watch: true

    development:
      src: 'app/index.js'
      dest: 'dist/development.js'

    testing:
      src: 'test/runner.js'
      dest: 'dist/test-runner.js'

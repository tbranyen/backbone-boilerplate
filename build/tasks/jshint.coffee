module.exports = ->
  @loadNpmTasks 'grunt-contrib-jshint'

  # Run your source code through JSHint's defaults.
  @config 'jshint',
    options:
      jshintrc: true

    development: [
      'app/**/*.js'
    ]

module.exports = ->
  @loadNpmTasks "grunt-contrib-jshint"

  # Run your source code through JSHint's defaults.
  @config "jshint", [
    "app/**/*.js"
  ]

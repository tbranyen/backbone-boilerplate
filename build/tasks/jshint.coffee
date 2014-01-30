module.exports = ->

  # Run your source code through JSHint's defaults.
  @config "jshint", [
    "app/**/*.js"
  ]

  @loadNpmTasks "grunt-contrib-jshint"

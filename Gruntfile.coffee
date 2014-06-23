module.exports = ->

  # Load task configurations.
  @loadTasks "build/tasks"

  # Run JSHint and a quick test.
  @registerTask "test", [
    "jshint"
    "karma:run"
  ]

  # When running the default Grunt command, just lint the code.
  @registerTask "default", [
    "clean"
    "jshint"
    "karma:run"
    "processhtml"
    "copy"
    "requirejs"
    "styles"
    "cssmin"
  ]

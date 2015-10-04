module.exports = ->

  # Load task configurations.
  @loadTasks "build/tasks"

  # Run JSHint and a quick test.
  @registerTask "test", [
    "jshint"
    "browserify:testing"
    "karma:run"
  ]

  # During development: lint the code, build out the development bundle, run
  # the connect server, and watch for changes.
  @registerTask "development", [
    "jshint"
    "browserify:development"
    "browserify:testing"
    "connect:development"
    "watch"
  ]

  # During production: lint, build out assets, and run tests.
  @registerTask "production", [
    "clean"
    "jshint"
    "browserify:production"
    "browserify:testing"
    "processhtml"
    "copy"
    "cssmin"
    "karma:run"
  ]

  # Alias to development.
  @registerTask "default", ["development"]

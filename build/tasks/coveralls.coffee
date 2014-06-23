module.exports = ->
  @loadNpmTasks "grunt-karma-coveralls"

  # Post code coverage results to Coveralls for tracking.
  @config "coveralls",
    options:
      coverage_dir: "test/coverage"

module.exports = ->

  @config "coveralls",
    options:
      coverage_dir: "test/coverage/PhantomJS 1.9.2 (Linux)/"

  @loadNpmTasks "grunt-karma-coveralls"

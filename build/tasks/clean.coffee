module.exports = ->

  # Wipe out previous builds and test reporting.
  @config "clean", [
    "dist/"
    "test/reports"
  ]

  @loadNpmTasks "grunt-contrib-clean"

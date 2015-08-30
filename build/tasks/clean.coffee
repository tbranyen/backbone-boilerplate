module.exports = ->
  @loadNpmTasks 'grunt-contrib-clean'

  # Wipe out previous builds and test reporting.
  @config 'clean', [
    'dist/'
    'test/reports'
  ]

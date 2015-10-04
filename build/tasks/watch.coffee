module.exports = ->
  @loadNpmTasks 'grunt-contrib-watch'

  # This will watch the application for changes and automatically reload the
  # page using LiveReload.
  @config 'watch',
    development:
      options:
        spawn: false
        livereload: true

      tasks: ['jshint']

      files: [
        'dist/source.js'
        'dist/test-runner.js'
        'app/styles/**/*.css'
        'index.html'
        'package.json'
      ]


module.exports = ->

  @config "processhtml",
    release:
      files:
        "dist/index.html": ["index.html"]

  @loadNpmTasks "grunt-processhtml"


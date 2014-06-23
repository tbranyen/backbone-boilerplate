module.exports = ->
  @loadNpmTasks "grunt-processhtml"

  @config "processhtml",
    release:
      files:
        "dist/index.html": ["index.html"]

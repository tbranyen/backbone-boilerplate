module.exports = ->
  @loadNpmTasks "grunt-processhtml"

  # Convert the development sources to production in the HTML.
  @config "processhtml",
    release:
      files:
        "dist/index.html": ["index.html"]

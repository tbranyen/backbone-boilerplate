module.exports = ->

  # Minify the distribution CSS.
  @config "cssmin",
    release:
      files:
        "dist/styles.min.css": ["dist/styles.css"]

  @loadNpmTasks "grunt-contrib-cssmin"

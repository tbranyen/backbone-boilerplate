module.exports = ->
  
  @config "compress",
    release:
      options:
        archive: "dist/source.min.js.gz"

      files: [
        "dist/source.min.js"
      ]

  @loadNpmTasks "grunt-contrib-compress"

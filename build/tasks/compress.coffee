module.exports = ->
  @loadNpmTasks "grunt-contrib-compress"
  
  @config "compress",
    release:
      options:
        archive: "dist/source.min.js.gz"

      files: [
        "dist/source.min.js"
      ]

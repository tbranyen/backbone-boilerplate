module.exports = ->
  @loadNpmTasks "grunt-contrib-copy"

  # Move vendor and app logic during a build.
  @config "copy",
    release:
      files: [
        src: "vendor/**", dest: "dist/"
      ]

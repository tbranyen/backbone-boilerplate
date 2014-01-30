module.exports = ->

  # Move vendor and app logic during a build.
  @config "copy",
    release:
      files: [
        src: "vendor/**", dest: "dist/"
      ]

  @loadNpmTasks "grunt-contrib-copy"

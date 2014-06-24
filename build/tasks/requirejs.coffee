module.exports = ->
  @loadNpmTasks "grunt-contrib-requirejs"

  # This task uses James Burke's excellent r.js AMD builder to take all modules
  # and concatenate them into a single file.
  @config "requirejs",
    release:
      options:
        mainConfigFile: "app/config.js"
        generateSourceMaps: true
        include: ["main"]
        out: "dist/source.min.js"
        optimize: "uglify2"
        baseUrl: "app"

        paths:
          "almond": "../bower_components/almond/almond"

        # Include a minimal AMD implementation shim.
        name: "almond"

        # Wrap everything in an IIFE.
        wrap: true

        # Do not preserve any license comments when working with source maps.
        # These options are incompatible.
        preserveLicenseComments: false

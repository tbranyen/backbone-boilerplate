module.exports = ->
  @loadNpmTasks "grunt-bbb-styles"

  # This task simplifies working with CSS inside Backbone Boilerplate projects.
  # Instead of manually specifying your stylesheets inside the HTML, you can
  # use `@imports` and this task will concatenate only those paths.
  @config "styles",

    # Out the concatenated contents of the following styles into the below
    # development file path.
    "dist/styles.css":

      # Point this to where your `index.css` file is location.
      src: "app/styles/index.css"

      # The relative path to use for the @imports.
      paths: ["app/styles"]

      # Rewrite image paths during release to be relative to the `img`
      # directory.
      forceRelative: "/app/img/"

module.exports = ->
  @loadNpmTasks "grunt-bbb-server"

  @config "server",
    options:
      host: "0.0.0.0"
      port: 8000

    development: {}

    release:
      options:
        prefix: "dist"

    test:
      options:
        forever: false
        port: 8001

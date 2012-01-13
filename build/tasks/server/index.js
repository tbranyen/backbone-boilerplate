// ============================================================================
// TASKS
// ============================================================================

task.registerTask("server", "Run development server.", function(name) {
  var options = config("server") || {};

  // Defaults set for server values
  var options = underscore.defaults(options, {
    favicon: "./favicon.ico",
    index: "./index.html",

    port: 8000,
    host: "127.0.0.1"
  });

  options.paths = options.paths || {};

  // Ensure paths have correct defaults
  options.paths = underscore.defaults(options.paths, {
    app: "./app",
    assets: "./assets",
    dist: "./dist"
  });

  // Run the server
  task.helper("server", options);

  // Fail task if errors were logged
  if (task.hadErrors()) { return false; }

  log.writeln("Listening on http://" + options.host + ":" + options.port);
});

// ============================================================================
// HELPERS
// ============================================================================

task.registerHelper("server", function(options) {
  // Require libraries
  var fs = require("fs");
  var express = require("express");
  var site = express.createServer();

  // Serve static files from folders
  Object.keys(options.paths).sort().reverse().forEach(function(key) {
    site.use("/" + key, express.static(options.paths[key]));
  });

  // Serve favicon.ico
  site.use(express.favicon(options.favicon));

  // Ensure all routes go home, client side app..
  site.get("*", function(req, res) {
    fs.createReadStream(options.index).pipe(res);
  });

  // Actually listen
  site.listen(options.port, options.host);
});

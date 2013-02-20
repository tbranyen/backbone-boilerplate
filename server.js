// Bring in the heat.
var requirejs = require("requirejs");

// Set the base folder to `./app`, load the configuration, and execute `main`.
requirejs({ baseUrl: "app" }, ["config"], requirejs.bind(null, ["main"]));

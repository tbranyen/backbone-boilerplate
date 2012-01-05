var grunt = require("grunt");

// Invoke the builder!
grunt.tasks([], {

  config: "build/config.js",

  tasks: ["build/tasks"]

});

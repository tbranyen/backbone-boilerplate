var fs = require("fs");
var grunt = require("grunt");

// Auto-load tasks
var taskList = fs.readdirSync(__dirname + "/tasks").filter(function(task) {
  return fs.statSync(__dirname + "/tasks/" + task).isDirectory();
}).map(function(task) {
  return __dirname + "/tasks/" + task;
}).concat(__dirname + "/tasks");

grunt.cli({
  base: __dirname + "/../",
  config: __dirname + "/config.js",
  tasks: taskList
}, function() {});

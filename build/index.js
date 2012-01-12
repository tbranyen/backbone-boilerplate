var fs = require("fs");
var grunt = require("grunt");

// Auto-load tasks
var taskList = fs.readdirSync(__dirname + "/tasks").filter(function(task) {
  return fs.statSync(__dirname + "/tasks/" + task).isDirectory();
}).map(function(task) {
  return "build/tasks/" + task;
}).concat("build/tasks");

grunt.cli({
  base: "./",
  config: "build/config.js",
  tasks: taskList
});

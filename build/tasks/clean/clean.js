/*
 * Grunt Task File
 * ---------------
 *
 * Task: Clean 
 * Description: Remove the contents of a given folder
 * Dependencies: rimraf
 *
 */

task.registerBasicTask("clean", "Remove the contents of a given folder", function(data, name) {
  var folder = require("path").resolve(data);

  // Delete all files inside the folder
  task.helper("clean", folder);

  // Fail task if errors were logged.
  if (task.hadErrors()) { return false; }

  // Otherwise, print a success message.
  log.writeln("Folder \"" + folder + "\" contents removed.");
});

task.registerHelper("clean", function(folder) {
  require("rimraf").sync(folder);
});

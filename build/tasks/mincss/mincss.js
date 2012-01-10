// ============================================================================
// TASKS
// ============================================================================

task.registerTask("mincss", "Compress down CSS files cleanly.", function(name) {
  if (!name) {
    // An argument wasn't passed. Run this task once for each CSS sub-prop.
    return task.runAllProps("mincss");
  }

  // Any name with a possible "." has to be escaped!
  var propname = "mincss." + config.escape(name);

  // Fail if any required config properties have been omitted.
  config.requires(propname);

  // Minify CSS.
  var errorcount = fail.errorcount;
  var files = file.expand(config(propname));
  file.write(name, task.helper('mincss', files));

  // Fail task if there were errors.
  if (fail.errorcount > errorcount) { return false; }

  // Otherwise, print a success message.
  log.writeln("File \"" + name + "\" created.");
});

// ============================================================================
// HELPERS
// ============================================================================

task.registerHelper("mincss", function(files) {
  var cleanCSS = require("clean-css");

  // Minify and combine all CSS 
  return files ? files.map(function(filepath) {
    return cleanCSS.process(file.read(filepath));
  }).join("") : "";
});

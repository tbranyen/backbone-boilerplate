// ============================================================================
// TASKS
// ============================================================================

task.registerBasicTask("mincss", "Compress down CSS files cleanly.", function(data, name) {
  // Minify CSS.
  var errorcount = fail.errorcount;
  var files = file.expand(data);
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


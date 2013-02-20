define(function(require, app) {

  // The root path to run the application through.
  app.root = "/";

  // Backbone development dependencies.
  var _ = require("underscore");
  var Backbone = require("backbone");
  var $ = require("jquery");

  // Configure LayoutManager with Backbone Boilerplate defaults.
  require("backbone.layoutmanager").configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: true,

    // Indicate where templates are stored.
    prefix: "app/templates/",

    // This custom fetch method will load pre-compiled templates or fetch them
    // remotely with AJAX.
    fetch: function(path) {
      // Concatenate the file extension.
      path = path + ".html";

      // If cached, use the compiled template.
      if (window.JST[path]) {
        return window.JST[path];
      }

      // Put fetch into `async-mode`.
      var done = this.async();

      // Seek out the template asynchronously.
      $.get(app.root + path, function(contents) {
        done(_.template(contents));
      }, "text");
    }
  });

});

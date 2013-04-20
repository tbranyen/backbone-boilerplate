define(function(require, exports, module) {

  var LayoutManager = require("backbone.layoutmanager");

  // Configure LayoutManager with Backbone Boilerplate defaults.
  LayoutManager.configure({
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

  var app = require("app");

  // The application layout handles link hijacking and can be modified to
  // handle other application global actions as well.
  app.layout = new Backbone.View({
    el: "main",

    events: {
      "click a[href]:not([data-bypass])": "hijackLinks"
    },

    hijackLinks: function(ev) {
      // Get the absolute anchor href.
      var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
      // Get the absolute root.
      var root = location.protocol + "//" + location.host + app.root;

      // Ensure the root is part of the anchor href, meaning it's relative.
      if (href.prop.slice(0, root.length) === root) {
        // Stop the default event to ensure the link will not cause a page
        // refresh.
        ev.preventDefault();

        // `Backbone.history.navigate` is sufficient for all Routers and will
        // trigger the correct events. The Router's internal `navigate` method
        // calls this anyways.  The fragment is sliced from the root.
        Backbone.history.navigate(href.attr, true);
      }
    }
  });

});

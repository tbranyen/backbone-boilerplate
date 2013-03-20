// External dependencies.
var _ = require("underscore");
var $ = require("jquery");
var Backbone = require("backbone");
var LayoutManager = require("backbone.layoutmanager");

// The main application router.
var Router = require("router");

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

// The application object has been converted to a View which provides events,
// link hijacking, and 
module.exports = new Backbone.View({
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

// The root path to run the application through.
module.exports.root = "/";

// Define your master router on the application namespace and trigger all
// navigation from this instance.
module.exports.router = new Router();

// Trigger the initial route and enable HTML5 History API support, set
// the root folder to '/' by default.  Change in app.js.
Backbone.history.start({ pushState: true, root: module.exports.root });

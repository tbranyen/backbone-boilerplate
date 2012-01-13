// Set the require.js configuration for your application.
require.config({
  paths: {
    libs: "../assets/js/libs",
    jquery: "../assets/js/libs/jquery",
    underscore: "../assets/js/libs/underscore",
    backbone: "../assets/js/libs/backbone",

    order: "../assets/js/plugins/order",
    use: "../assets/js/plugins/use"
  },

  use: {
    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: function() {
        return this.Backbone.noConflict();
      }
    },

    underscore: {
      attach: "_"
    }
  }
});

define("namespace", [
  "jquery",
  "use!underscore",
  "use!backbone"
],

function($, _, Backbone) {
  var exports = {};

  // This is useful when developing if you don't want to use a
  // build process every time you change a template.
  //
  // Delete if you are using a different template loading method.
  exports.fetchTemplate = function(path, done) {
    // Should be an instant synchronous way of getting the template, if it
    // exists in the JST object.
    var JST = this.JST = this.JST || {};
    if (JST[path]) {
      return done(JST[path]);
    }

    // Fetch it asynchronously if not available from JST
    return $.get(path, function(contents) {
      var tmpl = _.template(contents);
      JST[path] = tmpl;
      done(tmpl);
    });
  };

  // Create a custom object with a nested Views object
  exports.module = function(additionalProps) {
    return _.extend({ Views: {} }, additionalProps);
  };

  // Keep active application instances namespaced under an app object.
  exports.app = _.extend({}, Backbone.Events);

  return exports;
});

require([
  "namespace",
  "jquery",
  "use!backbone",
  "modules/example"
],

function (namespace, jQuery, Backbone, Example) {

  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  jQuery(function($) {

    // Shorthand the application namespace
    var app = namespace.app;

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({
      routes: {
        "": "index",
        ":hash": "index"
      },

      index: function(hash) {
        var route = this;
        var tutorial = new Example.Views.Tutorial();

        // Attach the tutorial to the DOM
        tutorial.render(function(el) {
          $("#main").html(el);

          // Fix for hashes in pushState and hash fragment
          if (hash && !route._alreadyTriggered) {
            // Reset to home, pushState support automatically converts hashes
            Backbone.history.navigate("", false);

            // Trigger the default browser behavior
            location.hash = hash;

            // Set an internal flag to stop recursive looping
            route._alreadyTriggered = true;
          }
        });
      }
    });
    
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

    // Trigger the initial route and enable HTML5 History API support
    Backbone.history.start({ pushState: true });

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router.  If the link has a data-bypass
    // attribute, bypass the delegation completely.
    $(document).on("click", "a:not([data-bypass])", function(evt) {
      // Get the anchor href and protcol
      var href = $(this).attr("href");
      var protocol = this.protocol + "//";

      // Ensure the protocol is not part of URL, meaning its relative.
      if (href.slice(protocol.length) !== protocol) {
        // Stop the default event to ensure the link will not cause a page
        // refresh.
        evt.preventDefault();

        // This uses the default router defined above, and not any routers
        // that may be placed in modules.  To have this work globally (at the
        // cost of losing all route events) you can change the following line
        // to: Backbone.history.navigate(href, true);
        app.router.navigate(href, true);
      }
    });
  });
  
});

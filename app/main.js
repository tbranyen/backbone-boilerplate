define(function(require, exports, module) {

  // Break out the application running from the configuration definition to
  // assist with testing.
  require("config");

  // Kick off the application.
  require(["app"], function(app) {
    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to '/' by default.  Change in app.js.
    Backbone.history.start({ pushState: true, root: app.root });
  });

});

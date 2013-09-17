define(function(require) {
  "use strict";

  var Backbone = require("backbone");
  var Router = require("router");

  // Specify top level modules so that they don't leak into other modules.
  QUnit.module("Router");

  // Test that the Router exists.
  test("Application Router", 2, function() {
    ok(Router, "Router constructor exists.");

    ok(Router.prototype instanceof Backbone.Router,
      "Router is a Backbone.Router");
  });
});

var Backbone = require("backbone");
var Router = require("router");

// Test that the Router exists.
test("Application Router", 2, function() {
  ok(Router, "Router constructor exists.");
  ok(Router.prototype instanceof Backbone.Router, "Router is a Backbone.Router");
});

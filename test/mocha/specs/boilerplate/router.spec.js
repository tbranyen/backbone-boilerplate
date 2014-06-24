define(function(require) {
  "use strict";

  var Backbone = require("backbone");
  var Router = require("router");

  // Test that the Router exists.
  describe("Router", function() {
    it("is a Backbone Router", function() {
      assert(Router);
      assert(new Router() instanceof Backbone.Router);
    });
  });
});

define(function(require) {
  "use strict";

  var Backbone = require("backbone");
  var Router = require("router");

  // Test that the Router exists.
  describe("Application Router", function() {
    it("exists", function() {
      expect(Router).toBeTruthy();
    });

    it("is a Backbone.Router", function() {
      expect(Router.prototype instanceof Backbone.Router).toBe(true);
    });
  });
});

define(function(require, exports, module) {

var Backbone = require("backbone");
var Router = require("router");

// Specify the module we test
describe("Router", function() {
  
  // Test that the Router exists.
  it("should exist", function() {
    expect(Router).to.exist;
    expect(new Router()).to.be.an.instanceof(Backbone.Router);
  });

});

});

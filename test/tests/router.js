import Backbone from 'backbone';
import Router from '../../app/router';

// Test that the Router exists.
describe("Router", function() {
  it("is a Backbone Router", function() {
    assert(Router);
    assert(new Router() instanceof Backbone.Router);
  });
});

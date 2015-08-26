// External dependencies.
import Backbone from 'backbone';

// Defining the application router.
var Router = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  index: function() {
    console.log("Welcome to your / route.");
  }
});

export default Router;

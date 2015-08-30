import Backbone from 'backbone';
import HomePage from './pages/home';

// Defining the application router.
var Router = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  index: function() {
    new HomePage().render();
  }
});

export default Router;

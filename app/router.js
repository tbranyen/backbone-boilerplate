import Backbone from 'backbone';
import HomePage from './views/pages/home';

// Defining the application router.
var Router = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  index: function() {
    new HomePage({ el: 'main' }).render();
  }
});

export default Router;

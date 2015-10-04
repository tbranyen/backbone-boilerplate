import Backbone from 'backbone';
import HomePage from './views/pages/home';

const routes = {
  '': 'index'
};

// Defining the application router.
class Router extends Backbone.Router {
  constructor() {
    super({ routes });
  }

  index() {
    new HomePage({ el: 'main' }).render();
  }
}

export default Router;

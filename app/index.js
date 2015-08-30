import Backbone from 'backbone';
import Router from './router';
import Component from './component';

Component.configure({
  fetchTemplate: function(template) { return template; },
  renderTemplate: function(template, data) {
    return template.render(data);
  }
});

// Define your master router on the application namespace and trigger all
// navigation from this instance.
var router = new Router();

// Trigger the initial route and enable HTML5 History API support, set the root
// folder to '/' by default.
Backbone.history.start({ pushState: true, root: '/' });

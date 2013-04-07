// Application.
var app = require("app");

// Router.
var Router = require("router");

// Define your master router on the application namespace and trigger all
// navigation from this instance.
app.router = new Router();

// Trigger the initial route and enable HTML5 History API support, set the
// root folder to '/' by default.  Change in app.js.
Backbone.history.start({ pushState: true, root: app.root });

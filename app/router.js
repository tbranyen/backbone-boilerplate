define(function(require) {

  var app = require("app");

  // Defining the application router.
  return Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {
      console.log("here"); 
    }
  });

});

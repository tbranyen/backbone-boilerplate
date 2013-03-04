define(function(require) {

  var Backbone = require("backbone");

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

var Backbone = require("backbone");

// Defining the application router.
module.exports = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  index: function() {
    console.log("here"); 
  }
});

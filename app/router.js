var Backbone = require("backbone");

// Defining the application router.
//module.exports = function() {
//
//  var router = require('express')();
//
//  router.get("/", function(req, res) {
//    console.log(Backbone.Layout);
//  });
//
//  router.listen(8888);
//
//  return router;
//
//};

module.exports = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  index: function() {
    console.log("here"); 
  }
});

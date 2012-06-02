define([
  "app",

  // Libs
  "backbone"

  // Modules

  // Plugins
],

function(app, Backbone) {

  // Create a new module
  var Example = app.module();

  // Example extendings
  Example.Model = Backbone.Model.extend({ /* ... */ });
  Example.Collection = Backbone.Collection.extend({ /* ... */ });
  Example.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  Example.Views.Tutorial = Backbone.View.extend({
    template: "app/templates/example",

    render: function(done) {
      // Fetch the template.
      var tmpl = app.fetchTemplate(this.template);

      // Render into the View's element.
      this.$el.html(tmpl());
    }
  });

  // Required, return the module for AMD compliance
  return Example;

});

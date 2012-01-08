// Use an IIFE...
// (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
// to assign your module reference to a local variable, in this case Example.
//
// Change line 16 'Example' to the name of your module, and change line 34 to
// the lowercase version of your module name.  Then change the namespace
// for all the Models/Collections/Views/Routers to use your module name.
//
// For example: Renaming this to use the module name: Project
//
// Line 16: (function(Project) {
// Line 38: })(namespace.module("project"));
//
// Line 18: Project.Model = Backbone.Model.extend({
//
(function(Example) {

  Example.Model = Backbone.Model.extend({ /* ... */ });
  Example.Collection = Backbone.Collection.extend({ /* ... */ });
  Example.Router = Backbone.Router.extend({ /* ... */ });

  // Render the template
  Example.Views.Tutorial = Backbone.View.extend({
    template: "app/templates/example.html",

    render: function(done) {
      var view = this;

      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        done(view.el);
      });
    }
  });


})(namespace.module("example"));

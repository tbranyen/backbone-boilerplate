define([
  // Libs
  "jquery",
  "use!underscore",
  "use!backbone"
],

function($, _, Backbone) {
  // Put application wide code here

  return {
    // This is useful when developing if you don't want to use a
    // build process every time you change a template.
    //
    // Delete if you are using a different template loading method.
    fetchTemplate: function(path, done) {
      var JST = window.JST = window.JST || {};
      var def = new $.Deferred();

      // Should be an instant synchronous way of getting the template, if it
      // exists in the JST object.
      if (JST[path]) {
        if (_.isFunction(done)) {
          done(JST[path]);
        }

        return def.resolve(JST[path]);
      }

      // Fetch it asynchronously if not available from JST, ensure that
      // template requests are never cached and prevent global ajax event
      // handlers from firing.
      $.ajax({
        url: path,
        type: "get",
        dataType: "text",
        cache: false,
        global: false,

        success: function(contents) {
          JST[path] = _.template(contents);

          // Set the global JST cache and return the template
          if (_.isFunction(done)) {
            done(JST[path]);
          }

          // Resolve the template deferred
          def.resolve(JST[path]);
        }
      });

      // Ensure a normalized return value (Promise)
      return def.promise();
    },

    // Create a custom object with a nested Views object
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Keep active application instances namespaced under an app object.
    app: _.extend({}, Backbone.Events)
  };
});

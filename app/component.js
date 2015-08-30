import LayoutManager from 'layoutmanager';
import $ from 'jquery';
import _ from 'lodash';

var Component = LayoutManager.extend({
  constructor: function() {
    LayoutManager.prototype.constructor.apply(this, arguments);

    // Attach the dataset.
    this.dataset = this.$el.data();

    // Activate new components found after rendering.
    this.listenTo(this, 'afterRender', function() {
      Component.activateAll(this);
    });
  },

  // Allow function templates to pass through.
  fetchTemplate: _.identity,

  serialize: function() {
    return this.dataset;
  }
});

// Mixin the component layer.
_.assign(Component, {
  components: {},

  register: function(identifier, Component) {
    // Allow a manual override of the selector to use.
    identifier = identifier || Component.prototype.selector;

    // Shim the element for older browsers.
    if (identifier.slice(0, 1).match(/[A-Za-z]/)) {
      document.createElement(identifier);
    }

    // Register a Component constructor, not an instance.
    this.components[identifier] = {
      ctor: Component,
      instances: []
    };

    // Save a pointer for easier lookup.
    Component.__pointer__ = this.components[identifier];

    return Component;
  },

  unregister: function(identifier) {
    delete this.components[identifier];
  },

  augment: function(cb) {
    _.each(this.__pointer__.instances, function(instance) {
      cb.call(instance, instance);
    });
  },

  activate: function($el, instances) {
    var CurrentComponent = this;

    // Convert all attributes on the Element into View properties.
    var attrs = _.reduce($el[0].attributes, function(attrs, attr) {
      var name = attr.name;

      // Optionally consume data attributes.
      if (attr.name.indexOf("data-") === 0) {
        name = attr.name.slice(5);
      }

      attrs[name] = attr.value;

      return attrs;
    }, {});

    // Associate the element as well.
    attrs.el = $el;

    // Create a new Component.
    var component = new CurrentComponent(attrs);

    // Trigger the standard `createdCallback`.
    if (typeof component.createdCallback === "function") {
      component.createdCallback();
    }

    // Add to the internal cache.
    instances.push(component);

    // By default use the template property provided, otherwise pull the
    // template contents from the DOM.
    if (!component.template) {
      component.template = _.template(_.unescape($el.html()));
    }

    // Render and apply to the Document.
    component.render();
  },

  activateAll: function(component) {
    var el = component ? component.el : document.body;

    _.each(this.components, function(Component, selector) {
      $(el).find(selector).each(function() {
        Component.ctor.activate($(this), Component.instances);
      });
    });
  }
});

// Activate all components on DOM ready.
$(function() {
  Component.activateAll();
});

export default Component;

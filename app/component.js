import LayoutManager from 'layoutmanager';
import $ from 'jquery';
import _ from 'underscore';

// Cache registered components into this object.
const components = {};

class Component extends LayoutManager {
  constructor() {
    super();

    // Not sure why super doesn't call the correct constructor :-/
    LayoutManager.prototype.constructor.apply(this, arguments);

    // Attach the dataset.
    this.dataset = this.$el.data();

    // Activate new components found after rendering.
    this.listenTo(this, 'afterRender', () => {
      Component.activateAll(this);
    });
  }

  // Allow function templates to pass through.
  fetchTemplate(template) {
    return template;
  }

  // Render out Combyne template's, override to use a different template
  // engine.
  renderTemplate(template, data) {
    return template.render(data);
  }

  serialize() {
    return this.dataset;
  }

  static register(identifier, Component) {
    // Allow a manual override of the selector to use.
    identifier = identifier || Component.prototype.selector;

    // Shim the element for older browsers.
    if (identifier.slice(0, 1).match(/[A-Za-z]/)) {
      document.createElement(identifier);
    }

    // Register a Component constructor, not an instance.
    components[identifier] = {
      ctor: Component,
      instances: []
    };

    // Save a pointer for easier lookup.
    Component.__pointer__ = components[identifier];

    return Component;
  }

  static unregister(identifier) {
    delete components[identifier];
  }

  static augment(cb) {
    _.each(this.__pointer__.instances, (instance) => {
      cb.call(instance, instance);
    });
  }

  static activate($el, instances) {
    var CurrentComponent = this;

    // Convert all attributes on the Element into View properties.
    var attrs = _.reduce($el[0].attributes, (attrs, attr) => {
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

    // Render and apply to the Document.
    component.render();
  }

  static activateAll(component) {
    var el = component ? component.el : document.body;

    _.each(components, function(Component, selector) {
      $(el).find(selector).each(function() {
        Component.ctor.activate($(this), Component.instances);
      });
    });
  }
}

// Activate all components on DOM ready.
$(Component.activateAll);

export default Component;

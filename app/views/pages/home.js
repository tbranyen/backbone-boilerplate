import Component from '../../component';
import template from './home.html';

// Import components.
import '../components/sample-component';

export default Component.extend({
  template,

  initialize: function() {
    this.template.registerPartial('nav', require('../partials/nav.html'));
  }
});

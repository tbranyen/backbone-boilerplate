import Component from '../../component';
import template from './sample-component.html';

const SampleComponent = Component.extend({
  template,

  events: {
    'click h1': 'handleClick'
  },

  handleClick: function(ev) {
    console.log('whatever');
  }
});

export default Component.register('sample-component', SampleComponent);

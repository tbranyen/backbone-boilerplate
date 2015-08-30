import Component from '../component';
import combyne from 'combyne';

var SampleComponent = Component.extend({
  events: {
    'click h1': 'handleClick'
  },

  handleClick: function(ev) {
    console.log('whatever');
  },

  template: combyne(`
    <h1>Testing this out</h1>
  `)
});

Component.register('sample-component', SampleComponent);

export default SampleComponent;

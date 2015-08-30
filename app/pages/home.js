import Component from '../component';
import combyne from 'combyne';
import '../components/sample-component';

export default Component.extend({
  el: 'main',

  template: combyne(`
    <nav>
      <div class="header"></div>
      <h1>Backbone Boilerplate</h1>

      <hr>

      <a href="#getting-started">Getting started</a>
      <a href="#components">Components</a>
    </nav>

    <header></header>

    <sample-component></sample-component>
  `),

  afterRender: function() {
    console.log('Rendered');
  }
});

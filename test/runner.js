import './tests/example';
import './tests/router';

if (!window.__karma__) {
  mocha.setup('bdd');
  mocha.run();
}

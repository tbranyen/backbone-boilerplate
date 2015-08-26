import './tests/example';
import './tests/router';

var karma = window.__karma__;

if (window.QUnit) {
  // Disable auto start.  We'll call start once the async modules have
  // loaded.
  window.QUnit.config.autostart = false;
} else if (window.chai) {
  // Optionally use chai with Mocha.
  window.expect = window.chai.expect;
}

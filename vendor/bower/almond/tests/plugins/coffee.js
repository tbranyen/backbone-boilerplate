
/**
 * @license cs 0.2.1 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/require-cs for details
 *
 * CoffeeScript is Copyright (c) 2011 Jeremy Ashkenas
 * http://jashkenas.github.com/coffee-script/
 * CoffeeScriptVersion: '1.1.1'
 */

/* Yes, deliciously evil. */
/*jslint evil: true, strict: false, plusplus: false, regexp: false */
/*global require: false, XMLHttpRequest: false, ActiveXObject: false,
  define: false, process: false, window: false */

(function () {


    define('cs',{


        version: '0.2.1',

        load: function (name, parentRequire, load, config) {
                    }
    });

}());
(function() {
  define('cs!controller',{
    attach: function(view) {
      //return require.ready(function() {
        return view.render();
      //});
    }
  });
}).call(this);

(function() {
  define('cs!util',{
    toDom: function(text) {
      return 'dom:' + text;
    }
  });
}).call(this);

(function() {
  define('cs!view',['cs!util'], function(util) {
    return {
      render: function(body) {
        return util.toDom('<b>This is a rendered view</b>');
      }
    };
  });
}).call(this);

(function() {
  define('cs!csmain',['cs!controller', 'cs!view'], function(controller, view) {
    return controller.attach(view);
  });
}).call(this);

require({
  paths: {
    cs: '../../cs'
  }
}, ['cs!csmain']);

define("main", function(){});

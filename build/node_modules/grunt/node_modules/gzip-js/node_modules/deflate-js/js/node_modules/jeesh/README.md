THE JEESH
---------

The Jeesh is like a starter pack for ender. At only *7.5k* the Jeesh can help you build anything from small prototypes to providing a solid base for large-scale rich application for desktop and mobile devices. At it's core, it's a collection of packages that we've found particularly useful for major use-case development endeavors -- but we encourage use to <code>add</code> and <code>remove</code> packages to really make it your own. Currently, the Jeesh includes:

  * domReady - a cross-browser [domReady](github.com/ded/domready)
  * Qwery - a fast light-weight [selector engine](https://github.com/ded/qwery)
  * Bonzo - a bullet-proof [DOM utility](https://github.com/ded/bonzo)
  * Bean - a multi-platform [Event provider](https://github.com/fat/bean)

BUILDING
--------

To build the jeesh... just run:

    $ ender -b jeesh

WHAT DOES THIS SETUP LOOK LIKE?
-------------------------------

<h3>domready</h3>

``` js
$.domReady(function () {...})
```

<h3>DOM queries</h3>

``` js
$('#boosh a[rel~="bookmark"]').each(function (el) { ... });
```

<h3>Manipulation</h3>

``` js
$('#boosh p a[rel~="bookmark"]').hide().html('hello').css({
  color: 'red',
  'text-decoration': 'none'
}).addClass('blamo').after('✓').show();
```

<h3>Events</h3>

``` js
$('#content a').bind('keydown input', handler);
$('#content a').emit('customEvent');
$('#content a').remove('click.myClick');
```

<h3>No Conflict</h3>

``` js
var E = $.noConflict(); // return '$' back to its original owner
E('#boosh a.foo').each(fn);
```

GETTING STARTED WITH THE JEESH
------------------------------
If you're looking to test drive this setup, have a play with [the compiled source](http://ender-js.s3.amazonaws.com/jeesh.min.js)
<iframe id="fiddle-example" src="http://jsfiddle.net/yakWA/2/embedded/"></iframe>
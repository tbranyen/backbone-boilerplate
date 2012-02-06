domReady
--------
It's easy. Works like this:

``` js
domReady(function () {
  // dom is loaded!
})
```

Browser support
---------------

  * IE6,7,8,9,10
  * Firefox 2,3,4
  * Safari 3,4,5
  * Chrome *
  * Opera *

Building
--------

    $ git clone git://github.com/ded/domready.git domready
    $ cd !$
    $ npm install --dev
    $ make
    $ open tests/test.html

Including with Ender
--------------------
Don't already have [Ender](http://ender.no.de)? Ender relies on [Node](http://nodejs.org), and [NPM](http://npmjs.org). Install it like this:

    npm install ender -g

Once you're good with that. Include domready in your package:

    ender add domready

Then use it like this:

``` js
$.domReady(function () {
  $('body').html('<p>boosh</p>')
})

// or

$(document).ready(function () {
  $('body').html('<p>boosh</p>')
})
```
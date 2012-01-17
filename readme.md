Backbone Boilerplate
====================

This boilerplate is the product of much research and frustration.  Existing
boilerplates exist that modify Backbone core, don't have a build process, or
are very prescriptive; this boilerplate changes that.

Organize your application in a logical filesystem, develop your
Models/Collections/Views/Routers inside modules, and build knowing you have
efficient code that will not bottleneck your users.

Thanks to our [Contributors](https://github.com/tbranyen/backbone-boilerplate/contributors)!

Special Thanks to: [cowboy](http://github.com/cowboy),
[iros](http://github.com/iros), [nimbupani](http://github.com/nimbupani) and
[wookiehangover](http://github.com/wookiehangover)

## Experimental AMD/RequireJS Build ##

This is a sandbox branch to mess with concepts and ideas of potentially
bringing AMD modules to Backbone Boilerplate as a default standard.

Please explore around and comment on if anything looks funky or strange.

### Using the build commands ###

The build commands are very similar to the master branch, with the exception
that minification is not on by default.

``` bash
# Default building with RequireJS outputs to dist/debug
node build

# Advanced building with minification
node build default min
```

### Using the server comamnds ###

The server has been completely refactored into a Grunt build task instead of a
separate Node.js script.  This has many added benefits of which defining your
server options inside the `build/config.js` is the best ^_^.

Note: Using RequireJS and AMD you never need to update the `index.html` file
to test in development/debug/release modes.  If your paths don't seem to be
working, checking the mapping in `build/config.js` under the server section.

There are lots of other cool settings you can use now for the server, such
as `port`, `host` and changing the default `index.html` name.

``` bash
# Running the development server using the script loader (great for devving)
node build server

# Running the development server using debug (concatenated files)
node build server:debug

# Running the development server using release (minified files)
node build server:release
```

Backbone Boilerplate
====================

This boilerplate is the product of much research and frustration.  Existing
boilerplates freely modify Backbone core, lack a build process, and are
very prescriptive; this boilerplate changes that.

Organize your application in a logical filesystem, develop your
Models/Collections/Views/Routers inside modules, and build knowing you have
efficient code that will not bottleneck your users.

Thanks to our [Contributors](https://github.com/tbranyen/backbone-boilerplate/contributors)!

Special Thanks to: [cowboy](http://github.com/cowboy),
[iros](http://github.com/iros), [nimbupani](http://github.com/nimbupani),
[wookiehangover](http://github.com/wookiehangover), and
[jugglinmike](http://github.com/jugglinmike)

## Installation ##

* **[Download ZIP](https://github.com/tbranyen/backbone-boilerplate/zipball/master)**
* **[Download TAR](https://github.com/tbranyen/backbone-boilerplate/tarball/master)**

If you would rather use git, you can simply:

``` bash
cd myproject
git clone https://github.com/tbranyen/backbone-boilerplate.git .
rm -rf .git
```

This will download the latest boilerplate into your application directory
and clean out all the unnecessary git remnants.

If you would like to use the *ahem* awesome bundled build tool, you will
need to install Node.js for your platform.  Don't worry! It's super easy now!
If not, you can simply delete the build folder.

Navigate to: http://nodejs.org/ and click Download.  Once you've downloaded
scroll down to the Build section to see how to configure and use it.

## Tutorial ##

Once you have the boilerplate downloaded and extracted, run the following:

``` bash
node build server
```

And launch your web browser to `http://localhost:8000/`, this will
load up the tutorial.

### Using the server commands ###

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

## HTML5 Boilerplate ##

This boilerplate started with an HTML5 Boilerplate base.  It has been stripped
of most of the comments and files, which you can see by visiting the H5BP repo.

https://github.com/h5bp/html5-boilerplate

## Filesystem Structure ##

This structure is very basic and yet offers many advantages such as isolation
of concerns whereas libraries and application code are separated completely.

Application code and templates are placed inside the `app` directory.  The
`index.js` file serves as the entry-point into the application and defines
the namespace as well as initializing the main application Router.  **Make
sure you change the namespace name here.**

The static assets are placed inside the `assets` directory.  The H5BP files
are already included here.  Place all new JavaScript libraries inside the
`assets/js/libs` directory.  If you are dealing with many jQuery plugins,
you may want to create a separate `plugins` folder inside `assets/js`.

**Default structure:**

```
.
├── app
│   ├── config.js
│   ├── main.js
│   ├── modules
│   ├── namespace.js
│   └── templates
├── assets
│   ├── css
│   ├── img
│   └── js
│       ├── libs
│       └── plugins
├── build
├── favicon.ico
├── index.html
└── test
    ├── jasmine
    └── qunit
```

## Modules ##

Modules are placed in the `app/modules/` directory.  There is an example module
there named: `example.js`.  The actual module definition function is located
inside the `app/index.js` file.  You create and reference modules with the same
function call:  `namespace.module("<module_name>")`.

Typically a module contains a single Model/Collection/Router and many Views.
Therefore the returned module object is empty except for a Views object
property that can be used to attach many Views to, like:

``` javascript
MyModule.Views.Detailed = Backbone.View.extend({ /* ... */ });

MyModule.Views.Main = Backbone.View.extend({ /* ... */ });
```

Attaching Models/Collections/Routers happen on the same level of the module,
like so:

``` javascript
MyModule.Model = Backbone.Model.extend({ /* ... */ });

MyModule.Router = Backbone.Router.extend({ /* ... */ });
```

## Events ##

Application wide events provide a convenient way for modules to communicate with each other. `namespace.app` references a copy of the Backbone.Events object, providing access to `.on()`, `.off()`, and `.trigger()`, that are documented in [Backbone.js Events](http://documentcloud.github.com/backbone/#Events)

For example, to add a callback to the "all" event:

```javascript
namespace.app.on("all", function(){}, this);
```

## HTML5 History and Hash Based Navigation ##

Out the box Backbone Boilerplate enables `pushState`.  It also supplies a script
inside `app/index.js` which attaches a click handler that monitors all links and
will automatically route all *relative* urls through your Backbone application.

It is designed to only route urls that are defined inside your `app.Router` and
not Routers that may be defined elsewhere.

*Absolute* urls such as `http://google.com/` will be routed normally.  So if
your application contains links to pages or files that you do not want to 
route through Backbone's router, make them absolute.

In order to test `pushState` use the development server explained below.

## Build Process ##

The Backbone Boilerplate build process is a state-of-the-art, task-driven
Node.js application that utilizes [@cowboy's](http://github.com/cowboy/)
[grunt](https://github.com/cowboy/grunt) project.

To run the defaults, execute the following command from the project root,
and *not from inside the build folder*.

``` bash
# Default building with RequireJS outputs to dist/debug
node build debug

# Advanced building with minification
node build release
```

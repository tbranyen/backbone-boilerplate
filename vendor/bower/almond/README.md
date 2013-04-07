#almond

A replacement [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) loader for
[RequireJS](http://requirejs.org). It is a smaller "shim" loader, providing the
minimal AMD API footprint that includes [loader plugin](http://requirejs.org/docs/plugins.html) support.

## Why

Some developers like to use the AMD API to code modular JavaScript, but after doing an optimized build,
they do not want to include a full AMD loader like RequireJS, since they do not need all that functionality.
Some use cases, like mobile, are very sensitive to file sizes.

By including almond in the built file, there is no need for RequireJS.
almond is around **1 kilobyte** when minified with Closure Compiler and gzipped.

Since it can support certain types of loader plugin-optimized resources, it is a great
fit for a library that wants to use [text templates](http://requirejs.org/docs/api.html#text)
or [CoffeeScript](https://github.com/jrburke/require-cs) as part of
their project, but get a tiny download in one file after using the
[RequireJS Optimizer](http://requirejs.org/docs/optimization.html).

If you are building a library, the wrap=true support in the RequireJS optimizer
will wrap the optimized file in a closure, so the define/require AMD API does not
escape the file. Users of your optimized file will only see the global API you decide
to export, not the AMD API. See the usage section below for more details.

So, you get great code cleanliness with AMD and the use of powerful loader plugins
in a tiny wrapper that makes it easy for others to use your code even if they do not use AMD.

## Restrictions

It is best used for libraries or apps that use AMD and:

* optimize all the modules into one file -- no dynamic code loading.
* all modules have IDs and dependency arrays in their define() calls -- the RequireJS optimizer will take care of this for you.
* do not use requirejs.ready(). If you use explicit dependencies for all modules, and you place
the optimized file in a script tag before the ending body tag, then this should not be a problem.
* the modules avoid circular dependencies. Some kinds may work, but you will likely have to manually control
the module listing order in the optimizer build profile.
* do not use [RequireJS multiversion support/contexts](http://requirejs.org/docs/api.html#multiversion).
* do not use require.toUrl() or require.nameToUrl().
* do not use [packages/packagePaths config](http://requirejs.org/docs/api.html#packages). If you need to use packages that have a main property, [volo](https://github.com/volojs/volo) can create an adapter module so that it can work without this config. Use the `amdify add` command to add the dependency to your project.

What is supported:

* dependencies with relative IDs.
* define('id', {}) definitions.
* define(), require() and requirejs() calls.
* loader plugins that can inline their resources into optimized files, and
can access those inlined resources synchronously after the optimization pass.
The [text](http://requirejs.org/docs/api.html#text) and
[CoffeeScript](https://github.com/jrburke/require-cs) plugins are two such plugins.


## Download

[Latest release](https://github.com/jrburke/almond/raw/latest/almond.js)


## Usage

[Download the RequireJS optimizer](http://requirejs.org/docs/download.html#rjs).

[Download the current release of almond.js](https://github.com/jrburke/almond/raw/latest/almond.js).

Run the optimizer using [Node](http://nodejs.org) (also [works in Java](https://github.com/jrburke/r.js/blob/master/README.md)):

    node r.js -o baseUrl=. name=path/to/almond include=main out=main-built.js wrap=true

This assumes your project's top-level script file is called main.js and the command
above is run from the directory containing main.js. If you prefer to use a build.js build profile instead of command line arguments, [this RequireJS optimization section](http://requirejs.org/docs/optimization.html#pitfalls) has info on how to do that.

wrap=true will add this wrapper around the main-built.js contents (which will be minified by UglifyJS:

    (function () {
        //almond will be here
        //main and its nested dependencies will be here
    }());

If you do not want that wrapper, leave off the wrap=true argument.

These optimizer arguments can also be used in a build config object, so it can be used
in [runtime-generated server builds](https://github.com/jrburke/r.js/blob/master/build/tests/http/httpBuild.js).

## Triggering module execution <a name="execution"></a>

As of RequireJS 2.0 and almond 0.1, modules are only executed if they are
called by a top level require call. The data-main attribute on a script tag
for require.js counts as a top level require call.

However with almond, it does not look for a data-main attribute, and if your
main JS module does not use a top level require() or requirejs() call to
trigger module loading/execution, after a build, it may appear that the code
broke -- no modules execute.

The 2.0 RequireJS optimizer has a build config, option **insertRequire** that you
can use to specify that a require([]) call is inserted at the end of the built
file to trigger module loading. Example:

    node r.js -o baseUrl=. name=path/to/almond.js include=main insertRequire=main out=main-built.js wrap=true

or, if using a build config file:

```javascript
{
    baseUrl: '.',
    name: 'path/to/almond',
    include: ['main'],
    insertRequire: ['main'],
    out: 'main-built.js',
    wrap: true
}
```

This will result with `require(["main"]);` at the bottom of main-built.js.

## Common errors

Explanations of common errors:

### deps is undefined

Where this line is mentioned:

    if (!deps.splice) {

It usually means that there is a define()'d module, but it is missing a name,
something that looks like this:

    define(function () {});

when it should look like:

    define('someName', function () {});

This is usually a sign that the tool you used to combine all the modules
together did not properly name an anonymous AMD module.

### x missing y

It means that module 'x' asked for module 'y', but module 'y' was not available.

This usually means that 'y' was not included in the built file that includes almond.

almond can only handle modules built in with it, it cannot dynamically load
modules from the network.


### No y

It means that a `require('y')` call was done but y was not available.

This usually means that 'y' was not included in the built file that includes almond.

almond can only handle modules built in with it, it cannot dynamically load
modules from the network.

## How to get help

* Contact the [requirejs list](https://groups.google.com/group/requirejs).
* Open issues in the [issue tracker](https://github.com/jrburke/almond/issues).

## Contributing

Almond follows the
[same contribution model as requirejs](http://requirejs.org/docs/contributing.html)
and is considered a sub-project of requirejs.
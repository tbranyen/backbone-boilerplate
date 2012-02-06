## JavaScript Template Compilation ##

* Contributed By: Tim Branyen (@tbranyen)

This build task compiles Underscore 1.2.4 compatible templates into functions
that can be concatenated and minified with existing source files.  This
increasings load times significantly.

### Installation/Updating instructions ###

Download this folder into your `build/tasks` directory.  Remove to remove any
existing `build/tasks/jst` folder to avoid potential conflicts.

### Configuration ###

Inside your `build/config.js` file, add a section named `jst` and specify the
output and source paths to compile into.  A typical example will look like:

``` javascript
jst: {
  "dist/debug/js/templates.js": ["app/templates/**/*.html"]
}
```

You may specify additional Underscore template settings inside the `jst`
options property.  The top level namespace is also configurable (defaults
to jst).

``` javascript
options: {
  jst: {
    // Change to mustache style tags
    templateSettings: {
      interpolate : /\{\{(.+?)\}\}/g
    },

    // Change top level namespace to TMPL
    namespace: "TMPL"
  }
}
```

### Usage ###

At the bottom of your `build/config.js` you will see `registerTask` containing
a list of build tasks to run, simply add jst in this space-separated list.

``` javascript
// An example registration might look something like this
task.registerTask("default", "clean ... concat jst");
```

Typically the jst task will be run before concatentation and minification
allowing this generated templates file to be included in the former tasks.
